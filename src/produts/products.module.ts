import { Module } from "@nestjs/common";
import ProductsService from "./products.service";
import { ProdutsController } from "./produts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema} from "../shemas/Product";


import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "../shemas/User";

import config from "../../config/config";
const {secret, token_ex} = config;

@Module({
  providers: [ProductsService],
  controllers: [ProdutsController],
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),  JwtModule.register({
    secret: secret,
    signOptions: {
      expiresIn: token_ex
    }
  })]
})
export class ProductsModule {
}