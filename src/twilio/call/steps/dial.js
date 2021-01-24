const dial = (twiml, call, step) => {

  const { numbers } = step

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

exports.dial = dial
