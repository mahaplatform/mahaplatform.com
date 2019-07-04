const offeringSerializer = (req, result) => ({
  id: result.get('id'),
  training: training(result.related('training')),
  employee: user(result.related('employee')),
  is_complete: result.get('is_complete'),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const training = (training) => {
  if(!training.get('id')) return null
  return {
    id: training.get('id'),
    title: training.get('title'),
    description: training.get('description')
  }
}

const user = (user) => {
  if(!user.get('id')) return null
  return {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    photo: user.related('photo').get('path')
  }
}

export default offeringSerializer
