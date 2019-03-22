const fingerprintMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'API_REQUEST') return next(action)

  const { device } = store.getState().maha

  next({
    ...action,
    headers: {
      ...action.headers,
      'Fingerprint': device.fingerprint
    }
  })

}

export default fingerprintMiddleware
