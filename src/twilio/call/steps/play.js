const { next } = require('./utils')

const play = (req, res, twiml, child = false) => {

  const loop = req.step.loop || 1

  const url = req.step.url

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
