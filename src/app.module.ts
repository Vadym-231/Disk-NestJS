import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminController } from "./admin/admin.controller";
import { ProductsModule } from "./produts/products.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { checkAuth } from "./middlewares/isAuth.middleware";

import config from "config/config";
import { JwtModule } from "@nestjs/jwt";
import { ProdutsController } from "./produts/produts.controller";

const { db, secret, token_ex } = config;

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(db), AuthModule, JwtModule.register({
    secret: secret,
    signOptions: {
      expiresIn: token_ex
    }
  })],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer// @ts-ignore
      .apply(checkAuth)
      .exclude({path: '/products', method: RequestMethod.GET}, {path: '/products/:id', method: RequestMethod.GET})
      .forRoutes(ProdutsController)
  }
}
