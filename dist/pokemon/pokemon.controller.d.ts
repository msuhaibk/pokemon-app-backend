import { PokemonService } from './pokemon.service';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getPokemon(): Promise<any>;
    getPokemonDetails(id: string): Promise<any>;
}
