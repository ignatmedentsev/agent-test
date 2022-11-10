import { HttpModule } from '@nestjs/axios';
import type { DynamicModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { apiUrls } from '~common/constants';

import { ApiService } from './api.service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return { baseURL: configService.get<string>('apiUrl') ?? apiUrls.prod };
      },
    }),
  ],
})
export class ApiModule {
  static forRoot(): DynamicModule {
    return {
      module: ApiModule,
      providers: [ApiService],
      exports: [ApiService],
    };
  }
}
