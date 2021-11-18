import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from "../config/config";
const { port } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3000'
  })
  await app.listen(port);
}
bootstrap();
