import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './transform-response.interceptor';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
  ],
})
export class CoreModule {}
