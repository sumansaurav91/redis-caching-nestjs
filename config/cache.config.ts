import { registerAs } from "@nestjs/config";

export default registerAs("cache", () => ({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 600,
    max: parseInt(process.env.CACHE_MAX_ITEMS, 10) || 100000,
    connectionTimeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
}));

