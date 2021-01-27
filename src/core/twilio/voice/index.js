const { execute, terminate } = require('./steps')
const fetchConfig = require('./config')
const Response = require('./response')
const Request = require('./request')
const status = require('./status')
const _ = require('lodash')

const evaluate = async (req) => {

  req.config = await fetchConfig(req)

  if(!req.config) return terminate(req)

  req.step = _.get(req.config, req.query.state)

  req.query.workflow = req.config.workflow.code

  if(!req.step) return terminate(req)

  const { twiml, result } = execute(req)

  await status(req, result)

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
