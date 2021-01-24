const { execute, terminate } = require('./steps')
const { fetchConfig } = require('./config')
const { parseEvent } = require('./event')
const { status } = require('./status')
const _ = require('lodash')

const handler = async (call) => {

  const { req, config } = call

  if(!config) return terminate()

  const step = _.get(config, req.query.state) || {}

  const execution = execute(call, step)

  await status(call, execution, step)

  return execution.twiml

}

exports.handler = async (event, context) => {

  const req = parseEvent(event)

  const config = await fetchConfig(req)

  const twiml = await handler({
    req,
    config
  })

  return {
    statusCode: 200,
    body: twiml.toString(),
    headers: {
      'Content-Type': 'application/xml'
    }
  }

}
