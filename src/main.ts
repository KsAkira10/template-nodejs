import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const { port, hostname } = configService.get('env');

  const config = new DocumentBuilder()
    .setTitle('Template NestJs')
    .setDescription('The Template NestJs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'swagger_ui';
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port, hostname, () => {
    logger.log(
      `Nest application running at http://${hostname}:${port}/`,
      'NestApplication',
    );
    logger.log(
      `Swagger running at http://${hostname}:${port}/${swaggerPath}`,
      'SwaggerApplication',
    );
  });
}
bootstrap();
