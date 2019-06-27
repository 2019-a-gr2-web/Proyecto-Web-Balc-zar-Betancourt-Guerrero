import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // @ts-ignore
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
