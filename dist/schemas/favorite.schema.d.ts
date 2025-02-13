import { Document } from 'mongoose';
export type FavoriteDocument = Favorite & Document;
export declare class Favorite {
    pokemonId: string;
    name: string;
    url: string;
    userId: string;
}
export declare const FavoriteSchema: import("mongoose").Schema<Favorite, import("mongoose").Model<Favorite, any, any, any, Document<unknown, any, Favorite> & Favorite & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Favorite, Document<unknown, {}, import("mongoose").FlatRecord<Favorite>> & import("mongoose").FlatRecord<Favorite> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
