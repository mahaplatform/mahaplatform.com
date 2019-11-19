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
      }
    })
  }).then(response => {
    success(response.creditCards[0])
  }).catch(err => {
    return failure(err)
  })

}
