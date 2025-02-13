import { HttpService } from '@nestjs/axios';
export declare class PokemonService {
    private readonly httpService;
    constructor(httpService: HttpService);
    fetchPokemon(id?: string): Promise<any>;
    private extractEvolutions;
}
