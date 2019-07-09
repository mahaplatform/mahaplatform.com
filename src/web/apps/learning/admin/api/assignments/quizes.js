import QuizSerializer from '../../../serializers/quiz_serializer'
import Quiz from '../../../models/quiz'

const quizesRoute = async (req, res) => {

  const quizes = await Quiz.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('learning_assignments','learning_assignments.training_id','learning_quizes.training_id')
    qb.where('learning_assignments.id', req.params.assignment_id)
  }).fetchAll({
    withRelated: ['questions'],
    transacting: req.trx
  })

  res.status(200).respond(quizes, QuizSerializer)

}

export default quizesRoute
