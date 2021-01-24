const { fetchConfig } = require('./config')
const { parseEvent } = require('./event')
const { execute } = require('./steps')
const { status } = require('./status')
const _ = require('lodash')

const handler = async (thread) => {

  const { req, config } = thread

  if(!config) return null

  const step = _.get(config, req.query.state) || {}

  const execution = execute(thread, step)

  await status(thread, execution, step)

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
    body: twiml ? twiml.toString() : 'true',
    headers: {
      'Content-Type': 'application/xml'
    }
  }

}
