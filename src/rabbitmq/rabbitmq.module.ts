import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RABBITMQ_URL } from 'src/config';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [],
      uri: RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
      channels: {},
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService, RabbitMQModule],
})
export class RabbitmqModule {}
