import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

import envConfig from './config/env.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [envConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      async useFactory(service: ConfigService) {
        return await service.get('database');
      },
      inject: [ConfigService],
    }),
    HealthModule,
    UsersModule,
  ],
})
export class AppModule {}
