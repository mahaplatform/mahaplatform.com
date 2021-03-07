const userSerializer = (req, result) => ({
  id: result.get('id'),
  account_id: result.get('account_id'),
  full_name: result.get('full_name'),
  first_name: result.get('first_name'),
  last_name: result.get('last_name'),
  initials: result.get('initials'),
  email: result.get('email'),
  cell_phone: result.get('cell_phone'),
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
  is_blocked: result.get('is_blocked'),
  locked_out_at: result.get('locked_out_at'),
  values: result.get('values'),
  last_online_at: result.get('last_online_at'),
  activated_at: result.get('activated_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default userSerializer
