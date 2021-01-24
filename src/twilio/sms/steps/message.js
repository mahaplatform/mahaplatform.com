const { next } = require('./utils')

const message = (twiml, thread, step, child = false) => {

  const text = step.text

  console.log(text)

  twiml.message(text)

  if(!child) next(twiml, thread)

  return {
    verb: 'message',
    text
  }

}

exports.message = message
