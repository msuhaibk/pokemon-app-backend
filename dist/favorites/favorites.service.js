"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const favorite_schema_1 = require("../schemas/favorite.schema");
const user_schema_1 = require("../schemas/user.schema");
const pokemon_masters_json_1 = __importDefault(require("../constants/pokemon-masters.json"));
let FavoritesService = class FavoritesService {
    constructor(favoriteModel, userModel) {
        this.favoriteModel = favoriteModel;
        this.userModel = userModel;
    }
    async findAllByUser(userId) {
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
    async create(userId, dto) {
        try {
            if (!userId) {
                throw new Error('No userId provided from frontend.');
            }
            let user = await this.userModel.findOne({ userId }).exec();
            if (!user) {
                const randomMaster = this.generateRandomPokemonMaster();
                const newUser = {
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
        }
        catch (error) {
            console.error("❌ Error adding favorite:", error);
            throw new Error("Error adding favorite");
        }
    }
    async delete(userId, pokemonId) {
        const deleted = await this.favoriteModel.findOneAndDelete({ userId, pokemonId }).exec();
        if (!deleted)
            throw new common_1.NotFoundException(`Favorite ${pokemonId} not found for user ${userId}`);
        return deleted;
    }
    generateRandomPokemonMaster() {
        console.log("matsa", pokemon_masters_json_1.default);
        const randomIndex = Math.floor(Math.random() * pokemon_masters_json_1.default?.length);
        return pokemon_masters_json_1.default[randomIndex];
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.Favorite.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map