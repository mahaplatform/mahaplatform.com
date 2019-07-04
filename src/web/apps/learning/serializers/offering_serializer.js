const offeringSerializer = (req, result) => ({
  id: result.get('id'),
  training: training(result.related('training')),
  date: result.get('date'),
  starts_at: result.get('starts_at'),
  ends_at: result.get('ends_at'),
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
