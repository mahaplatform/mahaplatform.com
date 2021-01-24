const { next } = require('./utils')

const say = (twiml, call, step, child = false) => {

  const voice = step.voice || 'woman'
  const loop = step.loop || 1
  const text = step.text

  twiml.say({
    voice,
    loop
  }, text)

  if(!child) next(twiml, call)

  return {
    verb: 'say',
    voice,
    loop,
    text
  }

}

exports.say = say
