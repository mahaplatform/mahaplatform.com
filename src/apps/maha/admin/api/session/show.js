import SessionSerializer from '../../../serializers/session_serializer'
import { createUserToken } from '@core/utils/user_tokens'
import collectObjects from '@core/utils/collect_objects'
import getUserAccess from '@core/utils/get_user_access'
import { createSession } from '../../../services/sessions'
import signer from '@core/services/signer'
import Session from '../../../models/session'
import Device from '../../../models/device'
import moment from 'moment'
import _ from 'lodash'

const navigations = collectObjects('admin/navigation.js')

const loadNavigation = async (req) => {
  return await Promise.reduce(navigations, async (navigations, navigation) => ({
    ...navigations,
    [navigation.config.code]: await navigation.default(req)
  }), {})
}

const _expandNavigation = (req, prefix, items) => {
  return Promise.reduce(items, async (items, item) => {
    const canAccess = item.access ? await item.access(req) : true
    if(!canAccess) return items
    const hasRights = item.rights ? item.rights.reduce((permit, right) => {
      return (!_.includes(req.rights, right)) ? false : permit
    }, true) : true
    if(!hasRights) return items
    const subitems = item.items ? await _expandNavigation(req, prefix, item.items) : []
    if(item.items && subitems.length === 0) return items
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
  return await createSession(req)
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

  session.notification_types = await req.trx('maha_users_notification_types')
    .select(req.trx.raw('maha_apps.code as appCode, maha_notification_types.code as notificationCode, maha_users_notification_types.*'))
    .where('user_id', req.user.get('id'))
    .innerJoin('maha_notification_types', 'maha_notification_types.id', 'maha_users_notification_types.notification_type_id')
    .innerJoin('maha_apps', 'maha_apps.id', 'maha_notification_types.app_id')

  const navigation = await loadNavigation(req)

  session.access = await getUserAccess(req, req.user)

  session.apps = await Promise.reduce(Object.keys(session.access.apps), async (apps, key) => {
    const app = session.access.apps[key]
    if(!navigation[app.code]) return apps
    if(!navigation[app.code].items || navigation[app.code].items.length === 0) {
      return [
        ...apps,
        app
      ]
    }
    const items = await _expandNavigation(req, app.path, navigation[app.code].items)
    return [
      ...apps,
      {
        ...app,
        items
      }
    ]
  }, []).then(apps => apps.sort((a, b) => {
    if(a.label > b.label) return 1
    if(a.label < b.label) return -1
    return 0
  }))

  if(process.env.DATA_ASSET_CDN_HOST) {

    const cookie = signer.getSignedCookie({
      policy: JSON.stringify({
        Statement: [
          {
            Resource: `${process.env.DATA_ASSET_CDN_HOST}/*`,
            Condition: {
              DateLessThan:{
                'AWS:EpochTime': moment().add(2,'weeks').unix()
              }
            }
          }
        ]
      })
    })

    Object.keys(cookie).map(key => {
      res.cookie(key, cookie[key], {
        domain: `.${process.env.DOMAIN}`,
        httpOnly: true,
        path: '/',
        secure: true
      })
    })

  }

  res.status(200).respond(session, SessionSerializer)

}

export default showRoute
