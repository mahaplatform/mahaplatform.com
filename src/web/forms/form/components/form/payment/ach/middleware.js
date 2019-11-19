import { client, usBankAccount } from 'braintree-web'

export default store => next => action => {

  const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'ACH_REQUEST') return next(action)

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

  return client.create({
    authorization: action.token
  }).then(function(clientInstance) {
    return usBankAccount.create({
      client: clientInstance
    })
  }).then(function(usBankAccountInstance) {
    return usBankAccountInstance.tokenize({
      bankDetails: action.data,
      mandateText: action.mandate
    }, function (err, response) {
      success(response)
    })
  }).catch(function (err) {
    return failure(err)
  })

}
