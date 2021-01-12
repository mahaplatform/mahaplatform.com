import redis from 'ioredis'

const clients = {}

const redisUrl = process.env.REDIS_URL.replace('redis://','')

const createRedisClient = (type) => {
  if(clients[type]) return clients[type]
  clients[type] = new redis({
    port: redisUrl.substring(redisUrl.indexOf(':') + 1, redisUrl.indexOf('/')),
    host: redisUrl.substring(0, redisUrl.indexOf(':')),
    db: redisUrl.substring(redisUrl.indexOf('/') + 1, redisUrl.length),
    connectTimeout: 60000
  })
  return clients[type]
}

export default createRedisClient
