import Check from '../../../models/check'

const editRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','line_items'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })


  res.status(200).respond(check, (req, check) => ({
    date_needed: check.get('date_needed'),
    vendor_id: check.get('vendor_id'),
    delivery_method: check.get('delivery_method'),
    invoice_number: check.get('invoice_number'),
    account_number: check.get('account_number'),
    receipt_ids: check.get('receipt_ids'),
    line_items: check.related('line_items').map(line_item => ({
      id: line_item.get('id'),
      project_id: line_item.get('project_id'),
      expense_type_id: line_item.get('expense_type_id'),
      description: line_item.get('description'),
      amount: line_item.get('amount'),
      tax: line_item.get('tax')
    }))
  }))

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
