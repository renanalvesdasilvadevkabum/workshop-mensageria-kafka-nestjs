import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import {
  ClientKafka,
  ClientProxy,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { countReset } from 'console';
import { Producer } from 'kafkajs';

@Controller('dummy')
export class DummyController {
  private identity: number;
  constructor(@Inject('KAFKA_PRODUCER') private client: Producer) {
    this.identity = new Date().getTime();
  }

  @EventPattern('criar-dummy')
  async criarDummy(
    @Payload() message: any
  ) {

    console.log(
      `Message: ${message.value.nome}`,
    );

  }


  @Post('enviarMensagemParaCriarDummy')
  async enviarMensagemParaCriarDummy() {

    const payload = {
      nome: "dummy"
    };

    const message = JSON.stringify(payload);

    await this.client.send({
      messages: [
        {
          value: message
        },
      ],
      topic: 'criar-dummy',
      acks: 0,
    });

  }
}
