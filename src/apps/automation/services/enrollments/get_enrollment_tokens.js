import { getRegistrationTokens } from '@apps/events/services/registrations'
import { getResponseTokens } from '@apps/forms/services/responses'
import { getContactTokens } from '@apps/crm/services/contacts'
import { getProgramTokens } from '@apps/crm/services/programs'
import { getOrderTokens } from '@apps/stores/services/orders'

const getEnrollmentTokens = async (req, { contact, enrollment, program }) => ({
  contact: await getContactTokens(req, {
    contact_id: contact.get('id')
  }),
  program: await getProgramTokens(req, {
    contact_id: contact.get('id'),
    program_id: program.get('id')
  }),
  ...enrollment.get('registration_id') ? {
    registration: await getRegistrationTokens(req, {
      registration_id: enrollment.get('registration_id')
    })
  } : {},
  ...enrollment.get('response_id') ? {
    response: await getResponseTokens(req, {
      response_id: enrollment.get('response_id')
    })
  } : {},
  ...enrollment.get('order_id') ? {
    order: await getOrderTokens(req, {
      order_id: enrollment.get('order_id')
    })
  } : {}
})

export default getEnrollmentTokens
