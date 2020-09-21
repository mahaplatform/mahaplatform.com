import _ from 'lodash'

const ACTION_TYPES = [
  'API_REQUEST',
  'SOCKETIO_JOIN',
  'SOCKETIO_LEAVE',
  'SOCKETIO_EMIT'
]

const tokenMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(!_.includes(ACTION_TYPES, type)) return next(action)

  const admin = store.getState().maha.admin

  if(!admin || _.isNil(admin.teams) || _.isNil(admin.active)) return next(action)

  if(_.isNil(admin.team)) return next(action)

  const token = action.token || admin.team.token

  next({
    ...action,
    token,
    headers: {
      ...action.headers,
      'Authorization': `Bearer ${token}`
    }
  })

}

export default tokenMiddleware
