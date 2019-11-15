import { client } from 'braintree-web'
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
  }, function(createErr, clientInstance) {
    clientInstance.request({
      endpoint: action.endpoint,
      method: action.method,
      data: action.data
    }, function (requestErr, response) {
      if (requestErr) return failure(requestErr)
      success(response)
    })
  })

}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}
