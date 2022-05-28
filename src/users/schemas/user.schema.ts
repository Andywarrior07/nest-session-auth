import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

@Schema()
export class User extends Document {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, reuqired: true })
  lastName: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
