import { Response } from 'express';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(userId: string, res: Response): Promise<void>;
    addFavorite(userId: string, createFavoriteDto: CreateFavoriteDto): Promise<import("../schemas/favorite.schema").Favorite | null>;
    removeFavorite(userId: string, id: string): Promise<import("../schemas/favorite.schema").Favorite>;
}
