const { fetchConfig } = require('./config')
const { parseEvent } = require('./event')
const { execute } = require('./steps')
const { status } = require('./status')
const btoa = require('btoa')
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

  res.headers['Set-Cookie'] = req.session ? `session=${btoa(JSON.stringify(req.session))}` : 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
  res.headers['Content-Type'] = 'application/xml'
  res.body = twiml.toString()

}

exports.handler = async (event, context) => {

  const req = parseEvent(event)

  const res = {
    statusCode: 200,
    body: '',
    headers: {
      'Content-Type': 'text/plain'
    }
  }

  await handler(req, res)

  return res

}
