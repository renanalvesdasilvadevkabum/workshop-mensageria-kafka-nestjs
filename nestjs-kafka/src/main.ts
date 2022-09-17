import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configKafka: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        retry: {
          //A funcionalidade de retry é para perda de conexões
          retries: 30, //É a quantidade máxima de tentativas de retry
          initialRetryTime: 10000, //Tempo inicial para tentar efetuar uma nova tentativa de conexão
          maxRetryTime: 5000, //Tempo dos demais intervalos de tentativas de conexão
        },
      },
      consumer: {
        groupId: 'ms-dummy',
        maxBytes: 200000,
      },
      run: {
        autoCommitInterval: 10000,
        eachBatchAutoResolve: false,
      },
    },
  };
  app.connectMicroservice(configKafka);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
