const contains = (text, answer) => {
  return answer.search(text) >= 0
}

const notContains = (text, answer) => {
  return answer.search(text) < 0
}

const equals = (text, answer) => {
  return answer === text
}

const notEquals = (text, answer) => {
  return answer !== text
}

const evaluate = (operation, text, answer) => {
  if(operation === '$ct') return contains(text, answer)
  if(operation === '$nct') return notContains(text, answer)
  if(operation === '$eq') return equals(text, answer)
  if(operation === '$neq') return notEquals(text, answer)
}

const sanitize = (text) => text.trim().toLowerCase()

const answer = (req, res, twiml) => {

  const { answers } = req.step

  const body = sanitize(req.body.Body)

  const index = answers.findIndex(answer => {
    const { operation, text } = answer
    return evaluate(operation, sanitize(text), body)
  })

  if(index >= 0) {
    req.session.state = `${req.session.state}.answers.${index}.steps.0`
  } else {
    req.session.state = `${req.session.state}.else.steps.0`
  }

  twiml.redirect('/sms')

  req.session.action = null

  return {
    verb: 'question',
    action: 'answer'
  }

}

const ask = (req, res, twiml) => {

  const { assets, message } = req.step

  const msg = twiml.message({
    action: `${process.env.TWILIO_HOST_STATUS}/sms-status`
  })

  msg.body(message)

  if(assets) {
    assets.map(asset => {
      msg.media(`${process.env.WEB_ASSET_HOST}/imagecache/w=350/${asset.key}`)
    })
  }

  req.session.action = 'answer'

  return {
    verb: 'question',
    action: 'ask',
    message,
    assets
  }

}

const getAction = (action) => {
  if(action === 'answer') return answer
  return ask
}

const question = (req, res, twiml) => {
  const action = getAction(req.session.action)
  return action(req, res, twiml)
}

module.exports = question
