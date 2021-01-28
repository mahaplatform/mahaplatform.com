const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine']

const speakNumber = (number) => {
  return number.split('').map(number => {
    return numbers[parseInt(number)]
  }).join(' ')
}

const getTarget = (identify) => {
  if(identify.name) return identify.name
  return speakNumber(identify.number)
}

const identify = (twiml, config) => {
  const { identify } = config
  if(!identify) return
  twiml.say(`Connecting you to ${getTarget(identify)}`)
}

module.exports = identify
