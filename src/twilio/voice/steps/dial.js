const dial = (req, twiml) => {

  const { numbers } = req.step

  const dial = twiml.dial({
    timeout: 15
  })

  numbers.map(number => {
    dial.number({}, number)
  })

  return {
    verb: 'dial',
    numbers
  }

}

module.exports = dial
