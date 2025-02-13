import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop({ required: true })
  pokemonId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  url: string;

  @Prop({ required: true })
  userId:  string;//Types.ObjectId;;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });
