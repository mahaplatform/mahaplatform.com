import PaymentMethodSerializer from '../../../serializers/payment_method_serializer'
import PaymentMethod from '../../../models/payment_method'
import Customer from '../../../models/customer'

const paymentMethodsRoute = async (req, res) => {

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

  const paymentMethods = await PaymentMethod.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
    }
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(paymentMethods, PaymentMethodSerializer)

}

export default paymentMethodsRoute
