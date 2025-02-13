import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }


    @Get()
    async getFavorites(@Headers('x-user-id') userId: string, @Res() res: Response) {
        if (!userId) {
            throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
        }
        try {
            // Fetch favorites and user icon
            const { favorites, userIcon, totalUniqueUsers } = await this.favoritesService.findAllByUser(userId);
            // Set icon in header

            userIcon && res.setHeader('X-User-Icon', userIcon);
            totalUniqueUsers && res.setHeader('X-User-Count', totalUniqueUsers); // Using Express method
            // Send the response with JSON data
            res.status(HttpStatus.OK).json(favorites); // Return the JSON response
        } catch (error) {
            // Handle errors
            throw new HttpException('Error fetching favorites', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async addFavorite(
        @Headers('x-user-id') userId: string,
        @Body() createFavoriteDto: CreateFavoriteDto,
    ) {
        if (!userId) {
            throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.favoritesService.create(userId, createFavoriteDto);
        } catch (error) {
            throw new HttpException('Error adding favorite', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async removeFavorite(
        @Headers('x-user-id') userId: string,
        @Param('id') id: string,
    ) {
        if (!userId) {
            throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.favoritesService.delete(userId, id);
        } catch (error) {
            throw new HttpException('Error removing favorite', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
