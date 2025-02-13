import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from '../schemas/favorite.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserDocument } from '../schemas/user.schema';
export declare class FavoritesService {
    private favoriteModel;
    private userModel;
    constructor(favoriteModel: Model<FavoriteDocument>, userModel: Model<UserDocument>);
    findAllByUser(userId: string): Promise<{
        favorites: Favorite[];
        userIcon: string | null;
        totalUniqueUsers: number;
    }>;
    create(userId: string, dto: CreateFavoriteDto): Promise<Favorite | null>;
    delete(userId: string, pokemonId: string): Promise<Favorite>;
    private generateRandomPokemonMaster;
}
