import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { MetricsService } from "./metrics.service";

@Injectable()
export class CacheService {
    private readonly logger = new Logger(CacheService.name);

    constructor(
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
        private readonly metricsService: MetricsService,
    ) {}

    async get<T>(key: string): Promise<T | null> {
        const endTimer = this.metricsService.startTimer();
        try{
            const value = await this.cacheManager.get<T>(key);
            if(value) {
                this.metricsService.recordHits();
                this.logger.log(`Cache hit for key ${key}`);
            } else {
                this.metricsService.recordMisses();
                this.logger.log(`Cache miss for key ${key}`);
            }
            return value;
        } catch (error) {
            this.metricsService.recordError();
            this.logger.error(`Error getting cache key ${key}: ${error.message}`);
            throw error;
        } finally {
            endTimer();
        }
    }

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
        const endTimer = this.metricsService.startTimer();
        try{
            await this.cacheManager.set(key, value, ttl);
            this.logger.log(`Cache set for key ${key}, TTL: ${ttl}`);
        } catch(error) {
            this.metricsService.recordError();
            this.logger.error(`Error setting cache key ${key}: ${error.message}`);
            throw error;
        } finally {
            endTimer();
        }
    }

    async del(key: string): Promise<void> {
        const endTimer = this.metricsService.startTimer();
        try{
            await this.cacheManager.del(key);
            this.logger.log(`Cache deleted for key ${key}`);
        } catch(error) {
            this.metricsService.recordError();
            this.logger.error(`Error deleting cache key ${key}: ${error.message}`);
            throw error;
        } finally {
            endTimer();
        }
    }

    async reset(): Promise<void> {
        const endTimer = this.metricsService.startTimer();
        try{
            await this.cacheManager.reset();
            this.logger.log('Cache reset');
        } catch(error) {
            this.metricsService.recordError();
            this.logger.error(`Error resetting cache: ${error.message}`);
            throw error;
        } finally {
            endTimer();
        }
    }

    async getMetrics() {
        return this.metricsService.getMetrics();
    }
}
