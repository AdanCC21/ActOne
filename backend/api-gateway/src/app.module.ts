import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'UPD_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3001 } },
      { name: 'AUTH_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3002 } },
      { name: 'STORY_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3003 } },
      { name: 'PD_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3004 } },
      { name: 'EDIT_SERVICE', transport: Transport.TCP, options: { host: 'localhost', port: 3005 } },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
