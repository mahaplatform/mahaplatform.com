import { getUsers, getMatchingUsers } from './utils'
import { getUrl } from '../../utils'

const choose = async (req, { config, state, step, twiml }) => {

  const users = await getUsers(req, step.recipients)

  const recipients = getMatchingUsers(req.query.digits, users)

  const index = parseInt(req.body.Digits) - 1

  const recipient = recipients[index]

  if(recipient) {
    twiml.redirect(getUrl(req, { state, action: 'announce', index: recipient.get('index') }))
  } else {
    twiml.say(`${req.body.Digits} is not a valid response`)
    twiml.redirect(getUrl(req, { state, action: 'answer', digits: req.query.digits }))
  }

  return {
    action: {
      data: {
        action: 'choose',
        choise: req.body.Digits
      }
    },
    twiml
  }

}

module.exports = choose
