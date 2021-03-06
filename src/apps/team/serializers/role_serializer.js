const roleSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  assignments: {
    app_ids: result.related('apps').map(app => app.id),
    right_ids: result.related('rights').map(right => right.id)
  },
  user_ids: result.related('users').map(user => user.id),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

export default roleSerializer
