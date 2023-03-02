import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions, IRMQServiceOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => {
    return {
        useFactory: getRMQOptions,
        inject: [ConfigService],
        imports: [ConfigModule],
    }
}

const getRMQOptions = (configService: ConfigService): IRMQServiceOptions => {
    return {
        exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
        connections: [
            {
                login: configService.get('AMQP_USER') ?? '',
                password: configService.get('AMQP_PASSWORD') ?? '',
                host: configService.get('AMQP_HOSTNAME') ?? '',
            }
        ],
        queueName: configService.get('AMQP_QUEUE'),
        prefetchCount: 32,
        serviceName: 'admin.files',
    }
}