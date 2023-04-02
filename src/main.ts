import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  // NestFactory.create класс с методом позволяющим создать приложение
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Проект на NestJs + Typescript')
      .setDescription('Домашнее задание')
      .setVersion('1.0.0')
      .addTag('sumnic')
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, () => console.log(PORT));
}

bootstrap();
