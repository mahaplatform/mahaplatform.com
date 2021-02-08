const { next } = require('./utils')

const play = (req, twiml, child = false) => {

  const loop = req.step.loop || 1

  const url = `${process.env.TWILIO_HOST_TWIML}/recording?key=${req.step.key}`

  twiml.play({
    loop
  }, url)

  if(!child) next(req, twiml)

  return {
    verb: 'play',
    loop,
    url
  }

}

module.exports = play
