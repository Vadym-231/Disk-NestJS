import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../shemas/User";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private  User : Model<UserDocument>) {}

  getUser(email) {
    return this.User.findOne({email: email}).select({ password: 1, email: 1, role: 1 }).exec();
  }

  getMe(email) {
    return this.User.findOne({email: email}).populate({password: 0}).exec();
  }


}
