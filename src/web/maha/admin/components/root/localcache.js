import _ from 'lodash'
import qs from 'qs'

const stash = []

const localCacheMiddleware = store => next => action => {

  const [,namespace,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(namespace !== 'maha.localcache' && type !== 'API_REQUEST' && (action.request_id === undefined)) return next(action)

  const cid = (action.cid) ? { cid: action.cid } : {}

  if(type === 'API_REQUEST') {

    if(!action.cache || action.method !== 'GET') return next(action)

    const query = action.query ? '?'+qs.stringify(action.query) : ''

    const key = action.endpoint + query

    stash.push({
      key,
      namespace,
      action,
      cid
    })

    return store.dispatch({
      type: 'LOCAL_GET',
      key,
      request: 'maha.localcache/LOAD_REQUEST',
      success: 'maha.localcache/LOAD_SUCCESS',
      failure: 'maha.localcache/LOAD_FAILURE'
    })

  } else if(type === 'LOAD_SUCCESS') {

    const original = stash[action.key]

    if(action.value !== null) {
      _.castArray(original.action.success).map(successAction => {
        store.dispatch({
          type: withNamespace(original.namespace, successAction),
          ...original.action.meta,
          ...original.cid,
          result: action.value
        })
      })
    }

    return next({
      ...original.action,
      success: [
        ...original.action.success,
        'maha.localcache/CACHE_REQUEST'
      ]
    })

  } else if(action.request_id) {

    const stashed = _.find(stash, { namespace, cid })

    if(!stashed) return next(action)

    return store.dispatch({
      type: 'LOCAL_SET',
      key: stashed.key,
      value: action.result,
      request: 'maha.localcache/SAVE_REQUEST',
      success: 'maha.localcache/SAVE_SUCCESS',
      failure: 'maha.localcache/SAVE_FAILURE'
    })

  }

  next(action)

}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default localCacheMiddleware
