import { client, usBankAccount } from 'braintree-web'
import _ from 'lodash'

export default store => next => action => {

  const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'BRAINTREE_REQUEST') return next(action)

  const success = (result) => {
    coerceArray(action.success).map(successAction => {
      store.dispatch({
        type: withNamespace(namespace, successAction),
        cid: action.cid,
        result
      })
    })
    if(action.onSuccess) action.onSuccess(result)
  }

  const failure = (error) => {
    coerceArray(action.failure).map(failureAction => {
      store.dispatch({
        type: withNamespace(namespace, failureAction),
        cid: action.cid,
        error
      })
    })
    if(action.onFailure) action.onFailure(error)
  }

  return client.create({
    authorization: action.token
  }, function(err, clientInstance) {
    if(err) return failure(err)
    if(action.method === 'card') {
      clientInstance.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          credit_card: action.data
        }
      }, function (err, response) {
        if(err) return failure(err)
        success(response.creditCards[0])
      })
    } else if(action.method === 'ach') {
      usBankAccount.create({
        client: clientInstance
      }, function (err, usBankAccountInstance) {
        if(err) return failure(err)
        usBankAccountInstance.tokenize({
          bankDetails: action.data,
          mandateText: action.mandate
        }, function (err, response) {
          if (err) return failure(err)
          success(response)
        })
      })

    }
  })

}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}
