import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  // NestFactory.create класс с методом позволяющим создать приложение
  const app = await NestFactory.create(AppModule, {
    // snapshot: true,
    // abortOnError: false,
  });

  await app.listen(PORT, () => console.log(PORT));
}





bootstrap();

// bootstrap().catch((err) => {
//   fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
//   process.exit(1);
// });
