const fingerprintMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'API_REQUEST') return next(action)

  const admin = store.getState().maha.admin

  const fingerprint = action.fingerprint || admin.fingerprint

  next({
    ...action,
    headers: {
      ...action.headers,
      'Fingerprint': fingerprint
    }
  })

}

export default fingerprintMiddleware
