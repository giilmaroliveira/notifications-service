import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.KAFKA_USERNAME || '',
          password: process.env.KAFKA_PASSWORD,
        },
        ssl: Boolean(process.env.KAFKA_SSL),
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
