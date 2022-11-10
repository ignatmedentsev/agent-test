import { NestFactory } from '@nestjs/core';
import { app } from 'electron';
import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '~common': process.env.NODE_ENV === 'dev' ? path.join(app.getAppPath(), '..', 'common') : path.join(app.getAppPath(), 'common'),
  '~main': process.env.NODE_ENV === 'dev' ? path.join(app.getAppPath()) : path.join(app.getAppPath(), 'main'),
  '~render': process.env.NODE_ENV === 'dev' ? path.join(app.getAppPath(), '..', 'render') : path.join(app.getAppPath(), 'render'),
});

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const appServer = await NestFactory.create(AppModule);
  appServer.enableCors({
    origin: (origin, callback) => {
      if (origin === 'http://localhost:4200' || typeof origin === 'undefined') {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`), false);
    },
  });
  await appServer.listen(3003);
}

void bootstrap();

