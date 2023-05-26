import { registerAs } from '@nestjs/config';

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  hostname: process.env.HOSTNAME || 'localhost',
};

export default registerAs<typeof config>('env', () => config);
