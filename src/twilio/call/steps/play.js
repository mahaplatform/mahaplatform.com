const { next } = require('./utils')

const play = (twiml, call, step, child = false) => {

  const loop = step.loop || 1
  const url = step.url

  twiml.play({
    loop
  }, url)

  if(!child) next(twiml, call)

  return {
    verb: 'play',
    loop,
    url
  }

}

exports.play = play
