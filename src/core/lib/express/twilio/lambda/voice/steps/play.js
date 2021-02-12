const { next } = require('./utils')

const play = (req, twiml, child = false) => {

  twiml.play(`${process.env.TWILIO_HOST_TWIML}/recording?key=${req.step.key}`)

  if(!child) next(req, twiml)

  return {
    verb: 'play',
    key: req.step.key
  }

}

module.exports = play
