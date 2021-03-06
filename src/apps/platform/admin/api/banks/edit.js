import Bank from '@apps/finance/models/bank'

const editRoute = async (req, res) => {

  const bank = await Bank.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!bank) return res.status(404).respond({
    code: 404,
    message: 'Unable to load bank'
  })

  await res.status(200).respond(bank, {
    fields: [
      'braintree_id',
      'rate',
      'amex_rate',
      'ach_rate',
      'has_ach',
      'has_paypal'
    ]
  })

}

export default editRoute
