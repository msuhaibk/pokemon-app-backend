"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
exports.CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon',
    POKEMON_API_URL: process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2',
    NODE_ENV: process.env.NODE_ENV || 'dev',
};
//# sourceMappingURL=config.js.map