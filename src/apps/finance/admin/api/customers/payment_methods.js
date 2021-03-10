import PaymentMethodSerializer from '@apps/finance/serializers/payment_method_serializer'
import PaymentMethod from '@apps/finance/models/payment_method'
import Customer from '@apps/finance/models/customer'

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

  const paymentMethods = await PaymentMethod.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(paymentMethods, PaymentMethodSerializer)

}

export default paymentMethodsRoute
