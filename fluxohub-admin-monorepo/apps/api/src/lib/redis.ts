import Redis from 'ioredis';

// Conexão com Redis para gerenciamento de Tokens Revogados (Blacklist) e Rate Limit
export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});
