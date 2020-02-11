import { client, googlePayment } from 'braintree-web'

export default store => next => action => {

  const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'GOOGLEPAY_REQUEST') return next(action)

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
    data: action.data,
    mandate: action.mandate
  })

  const paymentsClient = new window.google.payments.api.PaymentsClient({
    environment: process.env.GOOGLEPAY_ENVIRONMENT
  })

  let googlePaymentInstance = null

  return client.create({
    authorization: action.token
  }).then(clientInstance => {
    return googlePayment.create({
      client: clientInstance,
      googlePayVersion: 2
    })
  }).then(instance => {
    googlePaymentInstance = instance
    return paymentsClient.isReadyToPay({
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
      existingPaymentMethodRequired: true
    })
  }).then(isReadyToPay => {
    if(!isReadyToPay.result) return
    var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
      ...process.env.GOOGLEPAY_MERCHANTID ? {
        merchantId: process.env.GOOGLEPAY_MERCHANTID
      }: {},
      transactionInfo: {
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
        totalPrice: `${action.data.total}`
      }
    })
    return paymentsClient.loadPaymentData(paymentDataRequest)
  }).then(paymentData => {
    const { tokenizationData } = paymentData.paymentMethodData
    const token = JSON.parse(tokenizationData.token)
    const { details, nonce } = token.androidPayCards[0]
    success({
      nonce,
      card_type: details.cardType.toLowerCase(),
      last_four: details.lastFour
    })
  }).catch(function (err) {
    if(err.statusCode === 'CANCELED') return
    failure(err)
  })

}
