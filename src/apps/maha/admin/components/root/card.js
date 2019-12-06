import { client } from 'braintree-web'

export default store => next => action => {

  const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'CARD_REQUEST') return next(action)

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

  return client.create({
    authorization: action.token
  }).then(clientInstance => {
    return  clientInstance.request({
      endpoint: 'payment_methods/credit_cards',
      method: 'post',
      data: {
        credit_card: action.data
      },
      options: {
        validate: true
      }
    })
  }).then(response => {
    const { details, nonce } = response.creditCards[0]
    success({
      type: getCardType(details.cardType),
      last_four: details.lastFour,
      expiration_month: details.expirationMonth,
      expiration_year: details.expirationYear,
      nonce
    })
  }).catch(err => {
    return failure(err)
  })

}

const getCardType = (type) => {
  if(type === 'American Express') return 'amex'
  return type.toLowerCase()
}
