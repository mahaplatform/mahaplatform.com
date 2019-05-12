const SessionSerializer = (req, trx, session) => ({
  apps: session.apps,
  devices: session.sessions.map(session => ({
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
    notifications_enabled: session.user.get('notifications_enabled'),
    in_app_notifications_enabled: session.user.get('in_app_notifications_enabled'),
    notification_sound_enabled: session.user.get('notification_sound_enabled'),
    notification_sound: session.user.get('notification_sound'),
    push_notifications_enabled: session.user.get('in_app_notifications_enabled'),
    email_notifications_method: session.user.get('email_notifications_method'),
    mute_evenings: session.user.get('mute_evenings'),
    mute_evenings_end_time: session.user.get('mute_evenings_end_time'),
    mute_evenings_start_time: session.user.get('mute_evenings_start_time'),
    mute_weekends: session.user.get('mute_weekends'),
    notification_types: session.notification_types.map(type => ({
      type: `${type.appcode}:${type.notificationcode}`,
      inapp_enabled: type.inapp_enabled,
      push_enabled: type.push_enabled,
      email_enabled: type.email_enabled
    }))
  },
  rights: session.access.rights,
  team: {
    id: session.team.get('id'),
    title: session.team.get('title'),
    subdomain: session.team.get('subdomain'),
    logo: session.team.related('logo').get('path'),
    strategies: session.team.related('strategies').toJSON().map(strategy => strategy.name),
    token: session.token
  },
  user: {
    id: session.user.get('id'),
    session_id: session.session.get('id'),
    full_name: session.user.get('full_name'),
    initials: session.user.get('initials'),
    email: session.user.get('email'),
    photo: session.user.related('photo').get('path')
  }
})

export default SessionSerializer
