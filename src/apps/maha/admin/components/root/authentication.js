const authenticationMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(type !== 'API_UNAUTHENTICATED') return next(action)

  // const admin = store.getState().maha.admin
  //
  // if(admin.teams === null || admin.active === null) return next(action)

  store.dispatch({
    type: 'maha.admin/SIGNOUT_SUCCESS'
  })
}

export default authenticationMiddleware
