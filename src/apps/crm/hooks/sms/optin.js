import { updateConsent } from '@apps/crm/services/consents'

const optinHook = async (req, { from, sms, phone_number, twiml }) => {
  await updateConsent(req, {
    channel_type: 'sms',
    channel_id: from.get('id'),
    program: phone_number.related('program'),
    optout: false
  })
}

export default optinHook
