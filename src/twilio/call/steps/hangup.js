const hangup = (twiml, call, step) => {

  twiml.hangup()

  return {
    verb: 'hangup'
  }
}

exports.hangup = hangup
