const { next } = require('./utils')

const message = (req, res, twiml) => {

  const text = req.step.text

  twiml.message(text)

  next(req, res, twiml)

  return {
    verb: 'message',
    text
  }

}

exports.message = message
