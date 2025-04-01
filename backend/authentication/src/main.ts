import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  api.enableCors();

  const microSer = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: "localhost", port: 3002 }
  });

  microSer.listen();
  api.listen(3012);
}
bootstrap();
