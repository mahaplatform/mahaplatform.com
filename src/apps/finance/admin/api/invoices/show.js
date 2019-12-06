import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Invoice from '../../../models/invoice'

const showRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments.card','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  res.status(200).respond(invoice, InvoiceSerializer)

}

export default showRoute
