import Question from '../../../../models/question'

const editRoute = async (req, res) => {

  const question = await Question.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: [
      { answers: qb => qb.orderBy('delta', 'asc') }
    ],
    transacting: req.trx
  })

  if(!question) return res.status(404).respond({
    code: 404,
    message: 'Unable to load question'
  })

  res.status(200).respond(question, (req, question) => ({
    id: question.get('id'),
    text: question.get('text'),
    explanation: question.get('explanation'),
    answers: question.related('answers').map(answer => ({
      id: answer.get('id'),
      text: answer.get('text'),
      is_active: answer.get('is_correct'),
      is_correct: answer.get('is_correct')
    }))
  }))

}

export default editRoute
