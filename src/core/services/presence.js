import redis from '../vendor/redis'
import RedisLock from 'redis-lock'

const Lock = RedisLock(redis)

const lock = () => new Promise((resolve, reject) => {
  Lock(redis, 500, resolve)
})

export const getPresence = async () => {
  const unlock = await lock()
  const keys = await redis.keysAsync('presence:*')
  const presence = await Promise.map(keys, async (key) => {
    const presence = JSON.parse(await redis.getAsync(key))
    return presence
  })
  unlock()
  return presence
}

export const removePresence = async (session_id) => {
  const unlock = await lock()
  const key = `presence:${session_id}`
  await redis.delAsync(key)
  const keys = await redis.keysAsync('presence:*')
  const presence = await Promise.map(keys, async (key) => {
    const presence = JSON.parse(await redis.getAsync(key))
    return presence
  })
  unlock()
  return presence
}

export const setPresence = async (presences) => {
  const unlock = await lock()
  const presence = await Promise.map(presences, async (presence) => {
    const key = `presence:${presence.signin_id}`
    await redis.setAsync(key, JSON.stringify(presence), 'EX', 60 * 5)
    return presence
  })
  unlock()
  return presence
}
