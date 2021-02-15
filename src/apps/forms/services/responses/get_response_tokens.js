import { getPaymentTokens } from '@apps/finance/services/payments'
import Response from '@apps/forms/models/response'

const getResponseTokens = async (req, { response_id }) => {

  const response = await Response.query(qb => {
    qb.select('crm_responses.*','crm_response_tokens.tokens')
    qb.innerJoin('crm_response_tokens','crm_response_tokens.response_id','crm_responses.id')
    qb.where('id', response_id)
  }).fetch({
    transacting: req.trx
  })

  const payment_tokens = await getPaymentTokens(req, {
    invoice_id: response.get('invoice_id')
  })

  return {
    ...response.get('tokens'),
    ...payment_tokens
  }

}

export default getResponseTokens
