import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Invoice from '../../../models/invoice'

const listRoute = async (req, res) => {

  const invoices = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['customer_id','program_id'],
    searchParams: ['code']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','code','created_at']
  }).fetchPage({
    withRelated: ['customer','coupon','line_items','payments','program'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(invoices, InvoiceSerializer)

}

export default listRoute
