import QuizSerializer from '@apps/training/serializers/quiz_serializer'
import Quiz from '@apps/training/models/quiz'

const showRoute = async (req, res) => {

  const quiz = await Quiz.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

export default showRoute
