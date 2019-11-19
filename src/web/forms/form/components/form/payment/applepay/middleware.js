import { client, applePay } from 'braintree-web'

export default store => next => action => {

  const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'APPLEPAY_REQUEST') return next(action)

  const success = (result) => store.dispatch({
    type: `${namespace}/${action.success}`,
    cid: action.cid,
    result
  })

  const failure = (result) => store.dispatch({
    type: `${namespace}/${action.failure}`,
    cid: action.cid,
    result
  })

  store.dispatch({
    type: `${namespace}/${action.request}`,
    cid: action.cid,
    data: action.data
  })

  let applePayInstance = null

  return client.create({
    authorization: action.token
  }).then(clientInstance => {
    return applePay.create({
      client: clientInstance
    })
  }).then(instance => {
    applePayInstance = instance
    return window.ApplePaySession.canMakePaymentsWithActiveCard(instance.merchantIdentifier)
  }).then(() => {
    const paymentRequest = applePayInstance.createPaymentRequest({
      total: {
        label: 'My Store',
        amount: '19.99'
      },
      requiredBillingContactFields: ['postalAddress']
    })

    const session = new window.ApplePaySession(3, paymentRequest)

    session.onpaymentauthorized = event => {
      console.log('Your shipping address is:', event.payment.shippingContact)

      this.applePayInstance.tokenize({
        token: event.payment.token
      }).then(payload => {
        console.log('nonce:', payload.nonce)

        console.log('billingPostalCode:', event.payment.billingContact.postalCode)

        session.completePayment(window.ApplePaySession.STATUS_SUCCESS)
      }).catch(err => {
        console.error('Error tokenizing Apple Pay:', err)
        session.completePayment(window.ApplePaySession.STATUS_FAILURE)
      })

    }
    session.begin()
  }).catch((err) => {
    failure(err)
  })


}
