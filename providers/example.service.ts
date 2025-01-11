import { Injectable } from "@nestjs/common";
import { CacheService } from "cache/cache.service";

@Injectable()
export class ExampleService {
    constructor(private readonly cacheService: CacheService) {}

    async getData(id: string): Promise<any> {
        const cacheKey = `data:${id}`;

        // Try to get data from cache
        let data = await this.cacheService.get<any>(cacheKey);

        if(!data) {
            // If not in cache, fetch from database/external service
            data = await this.fetchDataFromSource(id);

            //Store in cache with TTL
            await this.cacheService.set(cacheKey, data, 60);
        }

        return data;
    }

    private async fetchDataFromSource(id: string): Promise<any> {
        // Fetch data from database/external service
        return { id, name: 'John Doe' };
    }
}
