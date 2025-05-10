import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);

  const microser = await NestFactory.createMicroservice(AppModule, {
    transpor: Transport.TCP,
    options: { host: 'localhost', port: 3004 }
  })

  api.enableCors();
  await microser.listen()
  await api.listen(3014);
}
bootstrap();
