const { execute, terminate } = require('./steps')
const fetchConfig = require('./config')
const Response = require('./response')
const Request = require('./request')
const status = require('./status')
const Redis = require('ioredis')
const _ = require('lodash')

const redis = new Redis({
  port: 6379,
  host: '172.31.31.51',
  db: 2,
  connectTimeout: 60000
})

const evaluate = async (req) => {

  req.config = await fetchConfig(req)

  if(!req.config) return terminate(req)

  req.step = _.get(req.config, req.query.state)

  req.query.workflow = req.config.workflow.code

  if(!req.step) return terminate(req)

  const { twiml, result } = execute(req)

  await status(req, result, redis)

  if(!twiml) return terminate(req)

  return twiml

}

const handle = async (req, res) => {

  const twiml = await evaluate(req)

  res.status(200).type('application/xml').send(twiml.toString())

}

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await handle(req, res)

  return res.render()

}
