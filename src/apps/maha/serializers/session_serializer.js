import getUserAccess from '../core/utils/get_user_access'
import loadNavigation from '../core/utils/load_navigation'

const _expandNavigation = (prefix, items, req, trx) => {

  return Promise.reduce(items, async (items, item) => {

    const canAccess = item.access ? await item.access(req, trx) : true

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

const SessionSerializer = async (req, trx, options) => {

  const navigation = await loadNavigation(req, trx)

  const access = await getUserAccess(req.user, trx)

  const apps = await Promise.reduce(Object.keys(access.apps), async (apps, key) => {

    const app = access.apps[key]

    if(!navigation[app.code]) return apps

    if(!navigation[app.code].items || navigation[app.code].items.length === 0) {

      return [
        ...apps,
        app
      ]

    }

    const items = await _expandNavigation(app.path, navigation[app.code].items, req, trx)

    return [
      ...apps,
      {
        ...app,
        items
      }
    ]

  }, [])

  const sort = (a, b) => {
    if(a.label > b.label) return 1
    if(a.label < b.label) return -1
    return 0
  }

  const notification_types = await options.knex('maha_users_notification_types')
    .transacting(trx)
    .select(options.knex.raw('maha_apps.code as appCode, maha_notification_types.code as notificationCode, maha_users_notification_types.*'))
    .where('user_id', req.user.get('id'))
    .innerJoin('maha_notification_types', 'maha_notification_types.id', 'maha_users_notification_types.notification_type_id')
    .innerJoin('maha_apps', 'maha_apps.id', 'maha_notification_types.app_id')

  return {
    apps: apps.sort(sort),
    devices: req.sessions.map(session => ({
      session_id: session.get('id'),
      id: session.related('device').get('id'),
      device: session.related('device').related('device_type').get('text'),
      platform: session.related('device').related('platform_type').get('text'),
      display_name: session.related('device').related('display_name').get('text'),
      fingerprint: session.related('device').get('fingerprint'),
      push_enabled: session.related('device').get('push_enabled'),
      last_active_at: session.get('last_active_at'),
      icon: session.related('device').get('icon')
    })),
    preferences: {
      notifications_enabled: req.user.get('notifications_enabled'),
      in_app_notifications_enabled: req.user.get('in_app_notifications_enabled'),
      notification_sound_enabled: req.user.get('notification_sound_enabled'),
      notification_sound: req.user.get('notification_sound'),
      push_notifications_enabled: req.user.get('in_app_notifications_enabled'),
      email_notifications_method: req.user.get('email_notifications_method'),
      mute_evenings: req.user.get('mute_evenings'),
      mute_evenings_end_time: req.user.get('mute_evenings_end_time'),
      mute_evenings_start_time: req.user.get('mute_evenings_start_time'),
      mute_weekends: req.user.get('mute_weekends'),
      notification_types: notification_types.map(type => ({
        type: `${type.appcode}:${type.notificationcode}`,
        inapp_enabled: type.inapp_enabled,
        push_enabled: type.push_enabled,
        email_enabled: type.email_enabled
      }))
    },
    rights: access.rights,
    team: {
      id: req.team.get('id'),
      title: req.team.get('title'),
      subdomain: req.team.get('subdomain'),
      logo: req.team.related('logo').get('path'),
      strategies: req.team.related('strategies').toJSON().map(strategy => strategy.name),
      token: req.token
    },
    user: {
      id: req.user.get('id'),
      session_id: req.session.get('id'),
      full_name: req.user.get('full_name'),
      initials: req.user.get('initials'),
      email: req.user.get('email'),
      photo: req.user.related('photo').get('path')
    }
  }

}

export default SessionSerializer
