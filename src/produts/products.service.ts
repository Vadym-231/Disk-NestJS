import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../shemas/Product";
import { Model } from "mongoose";
import { User,UserDocument } from "../shemas/User";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class ProductsService {

  constructor(
    @InjectModel(Product.name) private Product :  Model<ProductDocument>,
    @InjectModel(User.name) private User :  Model<UserDocument>,
    private jwt : JwtService
  ) {}

  getAll() : Promise<Product[]>{
    return this.Product.find().exec();
  }
  getById(id) : Promise<Product> {
    return this.Product.findOne({_id: id}).populate({ path: "createdBy", select: { password: 0 } }).exec();
  }
  deleteById(id) : Promise<Product>{
    return this.Product.findOneAndDelete({ _id: id }).exec();
  }
  setData(data: Product, id: String ) : Promise<Product> {
    return this.Product.findOneAndUpdate({_id: id}, {...data}).exec();
  }
  async createProduct(data: Product, token: string) : Promise<Product>{
    const {email} = await this.jwt.verifyAsync(token);
    const user = await this.User.findOne({email}).exec();
    return this.Product.create({...data, createAt: new Date(), editedAt: new Date(), createdBy: user._id});
  }
}