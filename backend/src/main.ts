import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<any>(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
  });

  const logger = new Logger('HTTP');

  app.use((req: Request, res: Response, next) => {
    const { method, url } = req;
    logger.log(`Request: ${method} ${url}`);
    next();
  });


  await app.listen(3001);
}
bootstrap();
