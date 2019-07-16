const assignmentSerializer = (req, result) => ({
  id: result.get('id'),
  assigning: assigning(result.related('assigning')),
  fulfillments: result.related('fulfillments').map(fulfillment),
  user: user(result.related('user')),
  configured: result.get('configured'),
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

const fulfillment = (fulfillment) => {
  if(!fulfillment.id) return null
  return {
    id: fulfillment.get('id'),
    offering: offering(fulfillment.related('offering')),
    training: training(fulfillment.related('training'))
  }
}

const offering = (offering) => {
  if(!offering.id) return null
  return {
    id: offering.get('id'),
    date: offering.get('date'),
    starts_at: offering.get('starts_at'),
    ends_at: offering.get('ends_at'),
    facilitator: offering.get('facilitator'),
    location: offering.get('location')
  }
}

const training = (training) => {
  if(!training.id) return null
  return {
    id: training.get('id'),
    title: training.get('title'),
    type: training.get('type'),
    description: training.get('description')
  }
}

export default assignmentSerializer
