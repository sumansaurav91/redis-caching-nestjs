import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { MetricsService } from './metrics.service';
import cacheConfig from '../config/cache.config';

@Module({
    imports: [
        ConfigModule.forFeature(cacheConfig),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore as unknown as CacheStoreFactory,
                host: configService.get('cache.host'),
                port: configService.get('cache.port'),
                ttl: configService.get('cache.ttl'),
                max: configService.get('cache.max'),
                connectionTimeout: configService.get('cache.connectionTimeout'),
                retryAttempts: configService.get('cache.retryAttempts'),
                retryDelay: configService.get('cache.retryDelay'),
            }),
         }),
    ],
    providers: [CacheService, MetricsService],
    exports: [CacheService],
})
export class RedisCacheModule {}
