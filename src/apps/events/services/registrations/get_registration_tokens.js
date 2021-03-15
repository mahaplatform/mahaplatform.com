import { getPaymentTokens } from '@apps/finance/services/payments'
import Registration from '@apps/events/models/registration'

const getRegistrationTokens = async (req, { registration_id }) => {

  const registration = await Registration.query(qb => {
    qb.select('events_registrations.*','events_registration_tokens.tokens')
    qb.innerJoin('events_registration_tokens','events_registration_tokens.registration_id','events_registrations.id')
    qb.where('id', registration_id)
  }).fetch({
    transacting: req.trx
  })

  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: registration.get('invoice_id')
  })

  const tokens = registration.get('tokens')

  return {
    ...tokens,
    ...payment_tokens,
    maha_url: `${process.env.ADMIN_HOST}${tokens.path}`
  }

}

export default getRegistrationTokens
