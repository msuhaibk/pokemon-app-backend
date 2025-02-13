import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { PokemonDataDto } from './dto/pokemon-data.dto';
import { CONFIG } from '../constants/config';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async fetchPokemon(id?: string) {
    try {
      const url = id
        ? `${CONFIG.POKEMON_API_URL}/pokemon/${id}` // Using the constant
        : `${CONFIG.POKEMON_API_URL}/pokemon?limit=150`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      if (!id) return data;

      const species = await firstValueFrom(
        this.httpService.get(data.species.url)
      ).then((res) => res.data);

      const evolutionChain = await firstValueFrom(
        this.httpService.get(species.evolution_chain.url)
      ).then((res) => res.data.chain);

      const evolutionOptions = this.extractEvolutions(evolutionChain);

      return {
        ...plainToInstance(PokemonDataDto, data, { excludeExtraneousValues: true }),
        evolutionOptions,
      };
    } catch (error) {
      throw new HttpException('Failed to fetch Pokemon', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private extractEvolutions(chain: any, evolutions: string[] = []): string[] {
    if (!chain) return evolutions;
    evolutions.push(chain.species.name);
    return chain.evolves_to.length
      ? this.extractEvolutions(chain.evolves_to[0], evolutions)
      : evolutions;
  }
}
