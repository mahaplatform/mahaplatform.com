const redirect = (req, res, twiml) => {
  req.session.state = req.step.step
  twiml.redirect('/sms')
}

module.exports = redirect
