## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

* This implementation provides a robust Redis caching solution with the following features:

## Configuration Management:


* Environment-based configuration using @nestjs/config
* Configurable Redis connection parameters
* Adjustable TTL and max items settings
* Retry mechanism for connection failures


## Metrics Collection:

* Cache hits/misses tracking
* Error monitoring
* Operation latency measurements
* Prometheus-compatible metrics format

## Advanced Logging:

* Detailed debug logs for cache operations
* Error logging with stack traces
* Operation-specific logging

## Error Handling:

* Comprehensive try-catch blocks
* Error metrics recording
* Proper error propagation


## Performance Optimizations:

* Connection pooling through Redis store
* Configurable timeouts
* Efficient key management

## Best Practices Implemented:

### Separation of Concerns:

* Separate modules for cache and metrics
* Clear interface definitions
* Modular configuration

### Monitoring and Observability:

* Prometheus metrics integration
* Detailed logging
* Performance tracking

### Error Handling:

* Graceful error recovery
* Proper error logging
* Error metrics

### Configuration:

* Environment-based configuration
* Sensible defaults
* Type-safe config

### Performance:

* Connection pooling
* Configurable timeouts
* Efficient key management

> Note: This implementation can handle your expected 200K GET calls per day with proper monitoring and scaling capabilities. The metrics service will help you monitor cache performance and make data-driven decisions for optimization.