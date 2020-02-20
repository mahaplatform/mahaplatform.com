import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Customer from '../../../models/customer'
import Invoice from '../../../models/invoice'

const invoicesRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const invoices = await Invoice.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
      qb.orderByRaw('date desc, created_at desc')
    },
    page: req.query.$page,
    withRelated: ['coupon','line_items'],
    transacting: req.trx
  })

  res.status(200).respond(invoices, InvoiceSerializer)

}

export default invoicesRoute
