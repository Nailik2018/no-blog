import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
@Schema()
export class Blog {
  @Prop()
  title: string;
  @Prop()
  description: string;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);