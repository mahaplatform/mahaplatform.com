import { getGateway } from './utils'
import { UsBankAccountVerification } from 'braintree'

const createTransaction = async (req, gateway) => {

  if(req.body.method === 'ach') {

    const customer = await gateway.customer.create({})

    const method = await gateway.paymentMethod.create({
      customerId: customer.customer.id,
      paymentMethodNonce: req.body.payment.nonce,
      options: {
        usBankAccountVerificationMethod: UsBankAccountVerification.VerificationMethod.NetworkCheck
      }
    })

    return await gateway.transaction.sale({
      amount: '10.00',
      paymentMethodToken: method.usBankAccount.token,
      merchantAccountId: 'cornellcooperativeextensionassociationoflivingstoncounty',
      options: {
        submitForSettlement: true
      }
    })

  }

  return await gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: req.body.payment.nonce,
    merchantAccountId: 'cornellcooperativeextensionassociationoflivingstoncounty',
    options: {
      submitForSettlement: true
    }
  })

}

const createRoute = async (req, res) => {

  const gateway = getGateway()

  const transaction = await createTransaction(req, gateway)

  res.status(200).respond(transaction)

}

export default createRoute
