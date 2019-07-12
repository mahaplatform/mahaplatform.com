const assignmentSerializer = (req, result) => ({
  id: result.get('id'),
  assigning: assigning(result.related('assigning')),
  option: option(result.related('option')),
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

const option = (option) => {
  if(!option.id) return null
  return {
    id: option.get('id'),
    trainings: option.related('trainings').map(training)
  }
}

const training = (training) => {
  if(!training.get('id')) return null
  return {
    id: training.get('id'),
    title: training.get('title'),
    type: training.get('type'),
    description: training.get('description')
  }
}

export default assignmentSerializer
