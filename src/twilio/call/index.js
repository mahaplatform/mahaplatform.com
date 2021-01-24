const { fetchConfig } = require('./config')
const { parseEvent } = require('./event')
const { status } = require('./status')
const { execute } = require('./steps')
const _ = require('lodash')

exports.handler = async (event, context) => {

  const req = parseEvent(event)

  const config = await fetchConfig(req)

  const step = _.get(config, req.query.state) || {}

  const call = {
    req,
    config
  }

  const execution = execute(call, step)

  await status(call, execution, step)

  return {
    statusCode: 200,
    body: execution.twiml.toString(),
    headers: {
      'Content-Type': 'application/xml'
    }
  }

}
