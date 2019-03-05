import redis from 'redis'

Promise.promisifyAll(redis.RedisClient.prototype)

export default redis.createClient(process.env.REDIS_URL)
