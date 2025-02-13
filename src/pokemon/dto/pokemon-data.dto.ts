import { Expose, Transform } from 'class-transformer';

export class PokemonDataDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  abilities: any[];

  @Expose()
  types: any[];

  @Expose()
  @Transform(({ obj }) => obj.sprites.front_default)
  sprite: string;

  @Expose()
  height: number;

  @Expose()
  weight: number;

  @Expose()
  evolutionOptions: string[];
}
