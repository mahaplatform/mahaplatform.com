const assignmentSerializer = (req, result) => ({
  id: result.get('id'),
  assigning: assigning(result.related('assigning')),
  user: user(result.related('user')),
  completed_at: result.get('completed_at'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const user = (user) => {
  if(!user.id) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

const assigning = (assigning) => {
  if(!assigning.id) return null
  return {
    id: assigning.get('id'),
    title: assigning.get('title'),
    assigned_by: user(assigning.related('assigned_by')),
    completed_by: assigning.get('completed_by')
  }
}

export default assignmentSerializer
