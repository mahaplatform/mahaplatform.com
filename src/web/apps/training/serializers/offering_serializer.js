const offeringSerializer = (req, result) => ({
  id: result.get('id'),
  training: training(result.related('training')),
  date: result.get('date'),
  starts_at: result.get('starts_at'),
  ends_at: result.get('ends_at'),
  facilitator: result.get('facilitator'),
  location: result.get('location'),
  limit: result.get('limit'),
  fulfillments_count: result.get('fulfillments_count'),
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

export default offeringSerializer
