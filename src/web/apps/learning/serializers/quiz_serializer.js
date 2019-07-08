const quizSerializer = (req, result) => ({
  id: result.get('id'),
  title: result.get('title'),
  questions: result.related('questions').map(question),
  created_at: result.get('created_at'),
  updated_at: result.get('updated_at')
})

const question = (question) => ({
  id: question.get('id'),
  delta: question.get('delta'),
  text: question.get('text'),
  explanation: question.get('explanation'),
  answers: question.related('answers').map(answer)
})

const answer = (answer) => ({
  id: answer.get('id'),
  delta: answer.get('delta'),
  text: answer.get('text'),
  is_active: answer.get('is_correct'),
  is_correct: answer.get('is_correct')
})

export default quizSerializer
