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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const class_transformer_1 = require("class-transformer");
const pokemon_data_dto_1 = require("./dto/pokemon-data.dto");
const config_1 = require("../constants/config");
let PokemonService = class PokemonService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async fetchPokemon(id) {
        try {
            const url = id
                ? `${config_1.CONFIG.POKEMON_API_URL}/pokemon/${id}`
                : `${config_1.CONFIG.POKEMON_API_URL}/pokemon?limit=150`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            if (!id)
                return data;
            const species = await (0, rxjs_1.firstValueFrom)(this.httpService.get(data.species.url)).then((res) => res.data);
            const evolutionChain = await (0, rxjs_1.firstValueFrom)(this.httpService.get(species.evolution_chain.url)).then((res) => res.data.chain);
            const evolutionOptions = this.extractEvolutions(evolutionChain);
            return {
                ...(0, class_transformer_1.plainToInstance)(pokemon_data_dto_1.PokemonDataDto, data, { excludeExtraneousValues: true }),
                evolutionOptions,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch Pokemon', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    extractEvolutions(chain, evolutions = []) {
        if (!chain)
            return evolutions;
        evolutions.push(chain.species.name);
        return chain.evolves_to.length
            ? this.extractEvolutions(chain.evolves_to[0], evolutions)
            : evolutions;
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map