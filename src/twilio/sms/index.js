const fetchConfig = require('./config')
const Response = require('./response')
const Request = require('./request')
const execute = require('./steps')
const status = require('./status')
const _ = require('lodash')

const evaluate = async (req, res) => {

  req.step = _.get(req.config, req.session.state) || {}

  const execution = execute(req, res)

  await status(req, execution.result)

  return execution.twiml

}

const handler = async (req, res) => {

  req.config = await fetchConfig(req)

  if(!req.config) return

  const twiml = await evaluate(req, res)

  if(!twiml) return

  if(req.session) res.setCookie('session', req.session)

  if(!req.session) res.expireCookie('session')

  res.status(200).type('application/xml').send(twiml.toString())

}

exports.handler = async (event, context) => {

  console.log(event)

  const req = new Request(event)

  console.log(req)

  const res = new Response()

  await handler(req, res)

  console.log(res.render())

  return res.render()

}
