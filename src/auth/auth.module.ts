import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../shemas/User";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: 'secret_key',
      signOptions: {
        expiresIn: '1m'
      }
    })
  ]
})
export class AuthModule {}
