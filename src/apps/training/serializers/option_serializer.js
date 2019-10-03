const optionSerializer = (req, result) => ({
  id: result.get('id'),
  trainings: result.related('trainings').map(training)
})

const training = (training) => {
  if(!training.get('id')) return null
  return {
    id: training.get('id'),
    title: training.get('title'),
    type: training.get('type'),
    description: training.get('description')
  }
}

export default optionSerializer
