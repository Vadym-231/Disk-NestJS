import { Controller, Get, Post, Delete, Body, Put, Param, Req } from "@nestjs/common";
import ProductsService from "./products.service";
import { Product, ProductSchema } from "../shemas/Product";
import { Request } from "express";

@Controller('products')

export class ProdutsController {
  constructor(
    private readonly service: ProductsService
  ) {}
  @Get()
  async getAll(){
    return await this.service.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id){
    return await this.service.getById(id)
  }
  @Post()
  async createProduct(@Body() data: Product, @Req() req: Request){
    const token = req.headers['authorization'];
    return await this.service.createProduct(data, token)
  }
  @Delete(':id')
  async deleteById(@Param('id') id){
    return await this.service.deleteById(id);
  }
  @Put(':id')
  async editProduct(@Body() data: Product, @Param('id') id){
    return await this.service.setData(data,id);
  }
}
