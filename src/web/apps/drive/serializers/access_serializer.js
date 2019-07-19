const AccessSerializer = (req, result) => ({
  id: result.get('id'),
  grouping: result.get('grouping'),
  user_id: result.get('user_id'),
  group_id: result.get('group_id'),
  access_type_id: result.get('access_type_id')
})

export default AccessSerializer
