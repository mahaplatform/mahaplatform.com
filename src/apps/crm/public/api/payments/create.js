import { getGateway } from './utils'

const createRoute = async (req, res) => {

  const gateway = getGateway('zzwjk4rf85jn7mwq')

  const result = await gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: req.body.payment.nonce,
    options: {
      submitForSettlement: true
    }
  })

  res.status(200).respond(result)

}

export default createRoute
