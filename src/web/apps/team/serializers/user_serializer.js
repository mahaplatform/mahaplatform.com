const userSerializer = (req, trx, result) => ({
  id: result.get('id'),
  full_name: result.get('full_name'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  secondary_email: result.get('secondary_email'),
  photo_id: result.get('photo_id'),
  photo: result.related('photo').get('path'),
  groups: result.related('groups').map(group => ({
    id: group.get('id'),
    title: group.get('title')
  })),
  roles: result.related('roles').map(role => ({
    id: role.get('id'),
    title: role.get('title')
  })),
  supervisors: result.related('supervisors').map(supervisor => ({
    id: supervisor.get('id'),
    full_name: supervisor.get('full_name')
  })),
  is_active: result.get('is_active'),
  email_notifications_method: result.get('email_notifications_method'),
  values: result.get('values'),
  last_online_at: result.get('last_online_at'),
  activated_at: result.get('activated_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default userSerializer
