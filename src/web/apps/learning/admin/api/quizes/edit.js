import QuizSerializer from '../../../serializers/quiz_serializer'
import Quiz from '../../../models/quiz'

const editRoute = async (req, res) => {

  const quiz = await Quiz.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['questions.answers'],
    transacting: req.trx
  })

  if(!quiz) return res.status(404).respond({
    code: 404,
    message: 'Unable to load quiz'
  })

  res.status(200).respond(quiz, QuizSerializer)

}

export default editRoute
