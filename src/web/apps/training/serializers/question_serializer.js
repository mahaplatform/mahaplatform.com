const questionSerializer = (req, result) => ({
  id: result.get('id'),
  delta: result.get('delta'),
  text: result.get('text'),
  answers: result.related('answers').map(answer),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const answer = (answer) => ({
  id: answer.get('id'),
  delta: answer.get('delta'),
  text: answer.get('text'),
  created_at: answer.get('created_at'),
  updated_at: answer.get('updated_at')
})

export default questionSerializer
