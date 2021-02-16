import { addConsent, removeConsent } from '@apps/crm/services/consents'
import { getNext } from '../utils'
import _ from 'lodash'

const consentStep = async (req, { config, contact, program, state, step, tokens }) => {

  const { action, channel_type, token } = step

  const value = _.get(tokens, token)

  const executor = action === 'add' ? addConsent : removeConsent

  await executor(req, {
    contact,
    program,
    type: channel_type,
    value
  })

  return {
    action: {
      data: {
        action,
        type: channel_type,
        key: value
      }
    },
    next: getNext(req, { config, state })
  }

}

export default consentStep
