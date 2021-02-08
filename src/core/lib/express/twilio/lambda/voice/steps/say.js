const { next } = require('./utils')

const say = (req, twiml, child = false) => {

  const voice = req.step.voice === 'man' ? 'Joey' : 'Salli'
  const loop = req.step.loop || 1
  const text = req.step.text

  text.split('\n').map(segment => {
    twiml.say({
      voice: `Polly.${voice}-Neural`,
      loop
    }, segment)
    twiml.pause(1)
  })

  if(!child) next(req, twiml)

  return {
    verb: 'say',
    voice,
    loop,
    text
  }

}

module.exports = say
