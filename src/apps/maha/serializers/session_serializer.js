const SessionSerializer = (req, session) => ({
  apps: session.apps,
  notification_types: session.notification_types.map(type => ({
    type: `${type.appcode}:${type.notificationcode}`,
    inapp_enabled: type.inapp_enabled,
    push_enabled: type.push_enabled,
    email_enabled: type.email_enabled
  })),
  rights: session.access.rights,
  team: {
    id: session.team.get('id'),
    title: session.team.get('title'),
    address: session.team.get('address'),
    subdomain: session.team.get('subdomain'),
    logo: session.team.related('logo').get('path'),
    token: session.token
  },
  user: {
    id: session.user.get('id'),
    full_name: session.user.get('full_name'),
    first_name: session.user.get('first_name'),
    last_name: session.user.get('last_name'),
    initials: session.user.get('initials'),
    email: session.user.get('email'),
    cell_phone: session.user.get('cell_phone'),
    photo: session.user.related('photo').get('path')
  }
})

export default SessionSerializer
