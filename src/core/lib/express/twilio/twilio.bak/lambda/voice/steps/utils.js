const _ = require('lodash')
const qs = require('qs')

const dialpad = ['abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']
const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine']

const getUserByNumber = (last_name) => {
  return last_name.toLowerCase().substr(0, 3).split('').map(letter => {
    return dialpad.findIndex(cluster => {
      return cluster.search(letter) >= 0
    }) + 2
  }).join('')
}

const getMatchingUsers = (digits, users) => {
  return users.map((user, index) => ({
    index,
    ...user
  })).filter(user => {
    return getUserByNumber(user.last_name) === digits
  })
}

const speakNumber = (number) => {
  return number.split('').map(number => {
    return numbers[parseInt(number)]
  }).join(' ')
}

const voiceurl = (path, params) => {
  return `${process.env.TWILIO_HOST_TWIML}${path}?${qs.stringify(params)}`
}

const next = (req, twiml) => {
  const { config } = req
  const { state } = req.query
  const parts = state.split('.')
  const nextstate = state.split('.').reverse().reduce((newstate, part, index) => {
    if(newstate !== null) return newstate
    if(!/^\d$/.test(part)) return newstate
    if(parts[parts.length - index - 2] !== 'steps') return newstate
    const next = parts.slice(0, parts.length - index)
    next[next.length - 1] = parseInt(next[next.length - 1]) + 1
    const candidate = next.join('.')
    return _.get(config, candidate) !== undefined ? candidate : null
  }, null)
  if(nextstate) return twiml.redirect(voiceurl(req, '/voice', { state: nextstate }))
  return twiml.hangup()
}

exports.next = next
exports.getUserByNumber = getUserByNumber
exports.getMatchingUsers = getMatchingUsers
exports.speakNumber = speakNumber
exports.voiceurl = voiceurl
