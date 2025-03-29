import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const api = await NestFactory.create(AppModule); // Http api
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: "localhost", port: 3001 }
  })

  api.enableCors();
  await microservice.listen();
  await api.listen(3011);
}
bootstrap();
