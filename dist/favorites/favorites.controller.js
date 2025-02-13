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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const favorites_service_1 = require("./favorites.service");
const create_favorite_dto_1 = require("./dto/create-favorite.dto");
let FavoritesController = class FavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async getFavorites(userId, res) {
        if (!userId) {
            throw new common_1.HttpException('User ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const { favorites, userIcon, totalUniqueUsers } = await this.favoritesService.findAllByUser(userId);
            userIcon && res.setHeader('X-User-Icon', userIcon);
            totalUniqueUsers && res.setHeader('X-User-Count', totalUniqueUsers);
            res.status(common_1.HttpStatus.OK).json(favorites);
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching favorites', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addFavorite(userId, createFavoriteDto) {
        if (!userId) {
            throw new common_1.HttpException('User ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.favoritesService.create(userId, createFavoriteDto);
        }
        catch (error) {
            throw new common_1.HttpException('Error adding favorite', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeFavorite(userId, id) {
        if (!userId) {
            throw new common_1.HttpException('User ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.favoritesService.delete(userId, id);
        }
        catch (error) {
            throw new common_1.HttpException('Error removing favorite', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)('x-user-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "removeFavorite", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map