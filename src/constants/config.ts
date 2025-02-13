export const CONFIG = {
    PORT: process.env.PORT || 3000,

    // MongoDB Connection
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon',
  
    // APIs
    POKEMON_API_URL: process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2',
  
    // Other environment-specific configurations
    NODE_ENV: process.env.NODE_ENV || 'dev',
  };
  