import twilio from '@core/vendor/twilio'
import atob from 'atob'

const createRoute = async (req, res) => {

  const config = JSON.parse(atob(req.body.config))

  await twilio.calls.create({
    url: `https://twiml.mahaplatform.com/call?config=${req.body.config}`,
    statusCallback: 'https://twiml.mahaplatform.com/status',
    statusCallbackEvent: ['initiated','ringing','answered','completed'],
    to: config.through,
    from: config.from
  })

  res.status(200).respond(true)

}

export default createRoute
