import { Injectable } from "@nestjs/common";
import { Counter, Histogram, Registry } from "prom-client";
import { CacheMetrics } from "./cache-metrics.interface";

@Injectable()
export class MetricsService {
    private readonly registry: Registry;
    private readonly cacheHits: Counter;
    private readonly cacheMisses: Counter;
    private readonly cacheErrors: Counter;
    private readonly cacheLatency: Histogram;

    constructor() {
        this.registry = new Registry();

        this.cacheHits = new Counter({
            name: "cache_hits_total",
            help: "Total Number of cache hits",
            registers: [this.registry],
        });

        this.cacheMisses = new Counter({
            name: "cache_misses_total",
            help: "Total Number of cache misses",
            registers: [this.registry],
        });

        this.cacheErrors = new Counter({
            name: "cache_errors_total",
            help: "Total Number of cache errors",
            registers: [this.registry],
        });

        this.cacheLatency = new Histogram({
            name: "cache_operation_during_seconds",
            help: "Duration of cache operations in seconds",
            buckets: [0.1, 0.5, 1, 2, 5],
            registers: [this.registry],
        });
    }

    recordHits(): void {
        this.cacheHits.inc();
    }

    recordMisses(): void {
        this.cacheMisses.inc();
    }

    recordError(): void {
        this.cacheErrors.inc();
    }

    startTimer(): () => void {
        const end = this.cacheLatency.startTimer();
        return () => end();
    }

    async getMetrics(): Promise<CacheMetrics> {
        const metrics = await this.registry.getMetricsAsJSON();
        return {
            hits: metrics.find((metric) => metric.name === "cache_hits_total")?.values[0].value || 0,
            misses: metrics.find((metric) => metric.name === "cache_misses_total")?.values[0].value || 0,
            errors: metrics.find((metric) => metric.name === "cache_errors_total")?.values[0].value || 0,
            latency: metrics.find((metric) => metric.name === "cache_operation_during_seconds")?.values[0].value || 0,
        };
    }
}
