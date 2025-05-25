import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3005 }
  })

  await microservice.listen();
  
}
bootstrap();
