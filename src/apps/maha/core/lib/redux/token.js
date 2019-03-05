import _ from 'lodash'

const ACTION_TYPES = [
  'API_REQUEST',
  'SOCKETIO_JOIN',
  'SOCKETIO_LEAVE',
  'SOCKETIO_MESSAGE'
]

const tokenMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(!_.includes(ACTION_TYPES, type)) return next(action)

  const admin = store.getState().maha.admin

  if(_.isNil(admin.teams) || _.isNil(admin.active)) return next(action)

  const team = admin.teams[admin.active]

  if(_.isNil(team)) return next(action)

  const token = action.token || team.token

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
