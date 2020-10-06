import Bank from '../../../../finance/models/bank'

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

  res.status(200).respond(bank, {
    fields: [
      'braintree_id',
      'rate',
      'amex_rate',
      'ach_rate'
    ]
  })

}

export default editRoute
