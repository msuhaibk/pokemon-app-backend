import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from '../schemas/favorite.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import PokemonMasters from '../constants/pokemon-masters.json';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findAllByUser(userId: string): Promise<{ favorites: Favorite[]; userIcon: string | null; totalUniqueUsers: number }> {
    const [favoritesResult, userResult, totalUsersResult] = await Promise.allSettled([
        this.favoriteModel.find({ userId }).lean().exec(),
        this.userModel.findOne({ userId }).select('icon').lean().exec(),
        this.userModel.distinct('userId').countDocuments(),
      ]);
      const favorites = favoritesResult.status === 'fulfilled' ? favoritesResult.value : [];
      const userIcon = userResult.status === 'fulfilled' ? userResult.value?.icon ?? null : null;
      const totalUniqueUsers = totalUsersResult.status === 'fulfilled' ? totalUsersResult.value : 0;
      return { favorites, userIcon, totalUniqueUsers };
  }
  

  async create(userId: string, dto: CreateFavoriteDto): Promise<Favorite | null> {
    try {
      if (!userId) {
        throw new Error('No userId provided from frontend.');
      }

      // Check if the user exists
      let user = await this.userModel.findOne({ userId }).exec();

      // If user doesn't exist, create a new user with a random Pokemon master
      if (!user) {
        const randomMaster = this.generateRandomPokemonMaster();
        const newUser: CreateUserDto = {
          userId,
          name: randomMaster.name,
          icon: randomMaster.icon,
        };

        console.log("🆕 Creating new user:", newUser);
        user = await this.userModel.create(newUser);
      }

      console.log("🔍 Checking existing favorite for user:", userId, "and pokemon:", dto.pokemonId);
      const existingFavorite = await this.favoriteModel.findOne({ userId, pokemonId: dto.pokemonId }).exec();

      if (existingFavorite) {
        console.log("✅ Favorite already exists:", existingFavorite);
        return existingFavorite;
      }

      console.log("🆕 Creating new favorite with data:", { ...dto, userId });
      const newFavorite = await this.favoriteModel.create({ ...dto, userId });

      console.log("🎉 Successfully created favorite:", newFavorite);
      return newFavorite;
    } catch (error) {
      console.error("❌ Error adding favorite:", error);
      throw new Error("Error adding favorite");
    }
  }

  async delete(userId: string, pokemonId: string): Promise<Favorite> {
    const deleted = await this.favoriteModel.findOneAndDelete({ userId, pokemonId }).exec();
    if (!deleted)
      throw new NotFoundException(`Favorite ${pokemonId} not found for user ${userId}`);
    return deleted;
  }

  private generateRandomPokemonMaster(): { name: string; icon: string } {
    // Pick a random Pokemon master from the JSON file
    console.log("matsa",PokemonMasters);
    const randomIndex = Math.floor(Math.random() * PokemonMasters?.length);
    return PokemonMasters[randomIndex];
  }
}
