import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({required: true}) name : string;
  @Prop({required: true}) type: string;
  @Prop({default: null}) description: string;
  @Prop({default: null}) headImg: string | null;
  @Prop({default: 0}) views: number;
  @Prop({default: 0}) likes: number;
  @Prop({default: 0}) dislike: number;
  @Prop({default: 0}) soldOut: number;
  @Prop({required: true}) startCount: number;
  @Prop({required: true}) count: number;
  @Prop() createdBy: string;
  @Prop() createAt: Date;
  @Prop() editedAt: Date;
  @Prop() images: string[];

}
export const ProductSchema = SchemaFactory.createForClass(Product)