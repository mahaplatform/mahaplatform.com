const hangup = (req, res, twiml) => {

  twiml.hangup()

  return {
    verb: 'hangup'
  }
}

module.exports = hangup
