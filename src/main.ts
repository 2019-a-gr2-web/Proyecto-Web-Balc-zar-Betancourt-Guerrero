import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//para el middelware de la logica de sesion
const express = require('express');
import * as session from 'express-session'; // Typescript
const FileStore = require('session-file-store')(session); // Nodejs

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // @ts-ignore
  app.set('view engine', 'ejs');


  //PARA EL MIDDLEWARE DE LA SESSION DE EXPRESS JS
  app.use(
    session({
      name: 'server-session-id',
      secret: 'La sofi es toxica',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false
      },
      store: new FileStore()
    })
  );
  await app.listen(3000);
}
bootstrap();
