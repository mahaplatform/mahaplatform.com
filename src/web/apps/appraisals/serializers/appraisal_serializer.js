const appraisalSerializer = (req, result) => ({
  id: result.get('id'),
  supervisor: user(result.related('supervisor')),
  employee: user(result.related('employee')),
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

export default appraisalSerializer
