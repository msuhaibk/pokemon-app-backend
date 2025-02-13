import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemon() {
    try {
      return await this.pokemonService.fetchPokemon();
    } catch (error) {
      throw new HttpException('Error fetching Pokemon', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getPokemonDetails(@Param('id') id: string) {
    try {
      return await this.pokemonService.fetchPokemon(id);
    } catch (error) {
      throw new HttpException('Error fetching Pokemon', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
