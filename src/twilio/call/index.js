const { fetchConfig } = require('./config')
const { executeStep } = require('./steps')
const Twilio = require('twilio')
const atob = require('atob')
const _ = require('lodash')
const qs = require('qs')

const generateCode = () => {
  return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
}

exports.handler = async (event, context) => {

  const body = qs.parse(decodeURIComponent(atob(event.body)))

  const query = qs.parse(event.rawQueryString)

  const config = await fetchConfig(query, body)

  const state = query.state || 'steps.0'

  const twiml = new Twilio.twiml.VoiceResponse()

  executeStep({
    body,
    config,
    enrollment: body.enrollment || generateCode(),
    query,
    step: _.get(config, state),
    state,
    twiml
  })

  return {
    statusCode: 200,
    body: twiml.toString(),
    headers: {
      'Content-Type': 'application/xml'
    }
  }

}
