import QuizSerializer from '@apps/training/serializers/quiz_serializer'
import Quiz from '@apps/training/models/quiz'

const quizesRoute = async (req, res) => {

  const quizes = await Quiz.query(qb => {
    qb.where('team_id', req.team.get('id'))
    if(req.params.quizable_type === 'trainings') {
      qb.where('training_id', req.params.quizable_id)
    }
    if(req.params.quizable_type === 'lessons') {
      qb.where('lesson_id', req.params.quizable_id)
    }
  }).fetchAll({
    withRelated: ['questions'],
    transacting: req.trx
  })

  res.status(200).respond(quizes, QuizSerializer)

}

export default quizesRoute
