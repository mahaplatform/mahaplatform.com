const authenticationMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'API_UNAUTHENTICATED') return next(action)

  const admin = store.getState().maha.admin

  if(admin.teams === null || admin.active === null) return next(action)

  store.dispatch({
    type: 'maha.admin/REMOVE_TEAM',
    index: admin.active
  })

  store.dispatch({
    type: 'reframe.flash/SET',
    style: 'info',
    message: 'Your session has unexpectedly expired'
  })

}

export default authenticationMiddleware
