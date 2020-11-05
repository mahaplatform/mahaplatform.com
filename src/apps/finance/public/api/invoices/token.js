import braintree from '@core/services/braintree'
import Invoice from '@apps/finance/models/invoice'

const tokenRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  req.team = invoice.related('team')

  const response = await new Promise((resolve, reject) => {
    braintree.clientToken.generate((err, response) => {
      if(err) return reject(err)
      resolve(response)
    })
  })

  res.status(200).respond({
    token: response.clientToken
  })

}

export default tokenRoute
