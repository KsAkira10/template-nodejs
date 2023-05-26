import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  autoLoadEntities: true,
};

export default registerAs<TypeOrmModuleOptions>('database', () => config);
