import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop({ required: true })
  userId:  string;//Types.ObjectId;;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ userId: 1 }, { unique: true });
