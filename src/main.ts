import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigin = process.env.FRONT_END_URL;
  app.enableCors({
    origin: [allowedOrigin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  console.info(`Nest application run on port: ${port}`);
}
bootstrap();
