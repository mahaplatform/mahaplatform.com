const AssigneeSerializer = (req, result) => ({
  id: result.get('id'),
  group_id: result.get('group_id'),
  user_id: result.get('user_id'),
  full_name: result.get('full_name'),
  initials: result.get('initials'),
  photo: result.get('photo'),
  is_everyone: result.get('is_everyone'),
  is_active: result.get('is_active')
})

export default AssigneeSerializer
