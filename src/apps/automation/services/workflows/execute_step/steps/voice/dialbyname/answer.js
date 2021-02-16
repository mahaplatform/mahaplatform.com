import { getUsers, getMatchingUsers } from './utils'
import { getUrl } from '../../utils'

const processAnswer = async (req, { config, enrollment, state, step, twiml }) => {

  const { star, hash } = step

  if(star && req.body.Digits === '*') {
    twiml.redirect(getUrl(req, { state: `${state}.star.steps.0` }))
    return 'pressed star'
  }

  if(hash && req.body.Digits === '#') {
    twiml.redirect(getUrl(req, { state: `${state}.hash.steps.0` }))
    return 'pressed hash'
  }

  const digits = req.query.digits || req.body.Digits

  const users = await getUsers(req, step.recipients)

  const recipients = getMatchingUsers(digits, users)

  const names = recipients.map(user => {
    return user.get('full_name')
  })

  if(recipients.length > 1) {
    const gather = twiml.gather({
      action: getUrl(req, { state, action: 'choose', digits }),
      finishOnKey: '',
      numDigits: 1,
      timeout: 3
    })
    names.map((name, index) => {
      gather.say(`Dial ${index + 1} for ${name}`)
      gather.pause({ length: 1 })
    })
    return `dialed ${names.join(' & ')}`
  }

  if(recipients.length === 1) {
    twiml.redirect(getUrl(req, { state, action: 'announce', index: recipients[0].get('index') }))
    return `dialed ${recipients[0].get('full_name')}`
  }

  twiml.say('I couldnt find anyone who matches that input')

  twiml.redirect(getUrl(req, { action: 'ask' }))

  return 'not found'

}

const answer = async(req, { config, enrollment, state, step, twiml }) => {

  const response = await processAnswer(req, { config, enrollment, state, step, twiml })

  return {
    action: {
      data: {
        action: 'answer',
        response
      }
    },
    twiml
  }

}

export default answer
