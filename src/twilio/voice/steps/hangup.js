const hangup = (req, twiml) => {

  twiml.hangup()

  return {
    verb: 'hangup'
  }
}

module.exports = hangup
