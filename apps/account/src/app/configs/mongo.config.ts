import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleAsyncOptions => {
    return {
        useFactory: (ConfigService: ConfigService) => ({
            uri: getMongoString(ConfigService)
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
    }
}

const getMongoString = (configService: ConfigService): string => {
    return 'mongodb://' +
        configService.get('MONGO_LOGIN') +
        ':' +
        configService.get('MONGO_PASSWORD') +
        '@' +
        configService.get('MONGO_HOST') +
        ':' +
        configService.get('MONGO_PORT') +
        '/' +
        configService.get('MONGO_AUTHDATABASE')
}