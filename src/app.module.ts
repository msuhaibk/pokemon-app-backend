import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CONFIG } from './constants/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', CONFIG.MONGO_URI), // Fallback URI
      }),
      inject: [ConfigService],
    }),
    PokemonModule,
    FavoritesModule,
  ],
})
export class AppModule {}