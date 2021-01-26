const Response = require('./response')
const Request = require('./request')
const status = require('./status')
const Redis = require('ioredis')

const redis = new Redis({
  port: 6379,
  host: '172.31.31.51',
  db: 2,
  connectTimeout: 60000
})

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await status(req, redis)

  res.status(200).type('text/plain').send(true)

  return res.render()

}
