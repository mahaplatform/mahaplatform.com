const { next } = require('./utils')

const say = (req, res, twiml, child = false) => {

  const voice = req.step.voice || 'woman'
  const loop = req.step.loop || 1
  const text = req.step.text

  twiml.say({
    voice,
    loop
  }, text)

  if(!child) next(req, res, twiml)

  return {
    verb: 'say',
    voice,
    loop,
    text
  }

}

module.exports = say
