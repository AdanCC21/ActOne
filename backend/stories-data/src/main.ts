import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3003 },
  });

  const app = await NestFactory.create(AppModule);

  await microservice.listen();
  await app.listen(3013);
}
bootstrap();