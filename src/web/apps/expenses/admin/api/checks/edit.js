import Check from '../../../models/check'

const editRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','user','project','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  res.status(200).respond(check, {
    fields: [
      'id',
      'date_needed',
      'description',
      'amount',
      'receipt_ids',
      'project_id',
      'expense_type_id',
      'vendor_id',
      'delivery_method'
    ]
  })

}

export default editRoute
