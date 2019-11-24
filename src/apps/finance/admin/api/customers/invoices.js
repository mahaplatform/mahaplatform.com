import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Customer from '../../../models/customer'
import Invoice from '../../../models/invoice'

const invoicesRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.customer_id)
  }).fetch({
    withRelated: [],
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const invoices = await Invoice.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(invoices, InvoiceSerializer)

}

export default invoicesRoute
