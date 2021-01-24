const { fetchConfig } = require('./config')
const { executeStep } = require('./steps')
const { parseEvent } = require('./event')

exports.handler = async (event, context) => {

  const req = parseEvent(event)

  const config = await fetchConfig(req)

  const twiml = executeStep({
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
