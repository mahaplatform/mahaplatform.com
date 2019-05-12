import SessionSerializer from '../../../serializers/session_serializer'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import loadNavigation from '../../../../../core/utils/load_navigation'
import getUserAccess from '../../../../../core/utils/get_user_access'
import NotificationType from '../../../models/notification_type'
import { createSession } from '../../../services/sessions'
import knex from '../../../../../core/services/knex'
import Session from '../../../models/session'
import Device from '../../../models/device'

const _expandNavigation = (prefix, items, req) => {
  return Promise.reduce(items, async (items, item) => {
    const canAccess = item.access ? await item.access(req, req.trx) : true
    if(!canAccess) return items
    const subitems = item.items ? await _expandNavigation(prefix, item.items) : []
    return [
      ...items,
      {
        label: item.label,
        ...subitems.length > 0 ? { items: subitems } : {},
        ...item.route ? { route: `${prefix}${item.route}` } : {},
        ...item.rights ? { rights: item.rights } : {}
      }
    ]
  }, [])
}

const _findOrCreateSession = async (req) => {
  const session = await Session.where({
    device_id: req.device.get('id'),
    user_id: req.user.get('id')
  }).fetch({
    transacting: req.trx
  })
  if(session) return session
  return await createSession(req, req.trx)
}

const showRoute = async (req, res) => {

  const session = {
    user: req.user,
    team: req.team
  }

  req.device = await Device.where({
    fingerprint: req.headers.fingerprint
  }).fetch({
    transacting: req.trx ,
    withRelated: ['platform_type','display_name']
  })

  session.session = await _findOrCreateSession(req)

  session.session.save({
    is_active: true
  }, {
    patch: true,
    transacting: req.trx
  })

  session.token = createUserToken(req.user, 'user_id', {
    session_id: session.session.get('id')
  })

  session.sessions = await Session.query(qb => {
    qb.innerJoin('maha_devices', 'maha_devices.id', 'maha_sessions.device_id')
    qb.where('maha_sessions.user_id', req.user.get('id'))
    qb.orderBy('maha_sessions.last_active_at', 'desc')
  }).fetchAll({
    withRelated: ['device.platform_type','device.display_name'],
    transacting: req.trx
  })

  session.notification_types = await NotificationType.query(qb => {
    qb.select(knex.raw('maha_apps.code as appCode, maha_notification_types.code as notificationCode, maha_users_notification_types.*'))
    qb.where('user_id', req.user.get('id'))
    qb.innerJoin('maha_notification_types', 'maha_notification_types.id', 'maha_users_notification_types.notification_type_id')
    qb.innerJoin('maha_apps', 'maha_apps.id', 'maha_notification_types.app_id')
  }).fetchAll({
    transacting: req.trx
  })

  const navigation = await loadNavigation(req, req.trx)

  session.access = await getUserAccess(req.user, req.trx)

  session.apps = await Promise.reduce(Object.keys(session.access.apps), async (apps, key) => {
    const app = session.access.apps[key]
    if(!navigation[app.code]) return apps
    if(!navigation[app.code].items || navigation[app.code].items.length === 0) {
      return [
        ...apps,
        app
      ]
    }
    const items = await _expandNavigation(app.path, navigation[app.code].items, req)
    return [
      ...apps,
      {
        ...app,
        items
      }
    ]
  }, []).sort((a, b) => {
    if(a.label > b.label) return 1
    if(a.label < b.label) return -1
    return 0
  })

  res.status(200).respond(session, (session) => SessionSerializer(req, req.trx, session))

}

export default showRoute
