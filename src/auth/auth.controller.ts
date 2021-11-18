import { BadRequestException, Body, Controller, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as crypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {Request, Response} from "express";


@Controller('auth')
export class AuthController {
  constructor(
    private service : AuthService,
    private jwt : JwtService
  ) {}

  @Get()
  async check(@Req() req: Request){
    try {
      const token = req.headers['authorization'];
      const payload = await this.jwt.verify(token);
      return await this.service.getUser(payload.email);
    }catch (e) {
      throw new UnauthorizedException()
    }

  }
  @Post()
  async login(@Body('email') email : string, @Body('password') pass : string) {
    const user = await this.service.getUser(email);
    if (!user) throw new BadRequestException('Bad cardinal!')
    const isCompare = crypt.compare(pass, user.password);
    if (!isCompare) throw new BadRequestException('Bad cardinal!')
    const { role } = user
    return this.jwt.sign({ role, email });
  }
}
