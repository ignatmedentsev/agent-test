import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { configuration } from '~main/config';
import { ElectronModule } from '~main/core/agent';
import { ApiModule } from '~main/core/api/';
import { ErrorFilter } from '~main/core/filter';
import { LogInterceptor } from '~main/core/interceptors';
import { LogModule } from '~main/core/log';

import { AppController } from './app.controller';

@Module({
  imports: [
    ElectronModule.forRoot(),
    ApiModule.forRoot(),
    LogModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {
}
