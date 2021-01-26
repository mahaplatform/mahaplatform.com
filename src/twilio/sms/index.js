const fetchConfig = require('./config')
const Response = require('./response')
const Request = require('./request')
const execute = require('./steps')
const status = require('./status')
const Redis = require('ioredis')
const _ = require('lodash')

const redis = new Redis({
  port: 6379,
  host: '172.31.31.51',
  db: 2,
  connectTimeout: 60000
})

const evaluate = async (req, res) => {

  req.config = await fetchConfig(req)

  if(!req.config) return null

  req.session.workflow = req.config.workflow.code

  req.step = _.get(req.config, req.session.state)

  if(!req.step) return null

  const { twiml, result } = execute(req, res)

  await status(req, result, redis)

  if(!twiml) return null

  return twiml

}

const handle = async (req, res) => {

  const twiml = await evaluate(req, res)

  if(!twiml || !req.session.state) res.expireCookie('session')

  if(!twiml) return res.status(200).type('text/plain').send(null)

  if(req.session.state) res.setCookie('session', req.session)

  res.status(200).type('application/xml').send(twiml.toString())

}

exports.handler = async (event, context) => {

  const req = new Request(event)

  const res = new Response()

  await handle(req, res)

  return res.render()

}
