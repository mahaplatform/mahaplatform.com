import QuizSerializer from '../../../serializers/quiz_serializer'
import knex from '../../../../../core/services/knex'
import Quiz from '../../../models/quiz'

const quizesRoute = async (req, res) => {

  const quizes = await Quiz.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('learning_quizes.*,learning_administrations.was_passed'))
    qb.joinRaw('left join learning_administrations on learning_administrations.quiz_id=learning_quizes.id and learning_administrations.user_id=?', req.user.get('id'))
    qb.innerJoin('learning_assignments','learning_assignments.training_id','learning_quizes.training_id')
    qb.where('learning_assignments.id', req.params.assignment_id)
  }).fetchAll({
    withRelated: ['questions'],
    transacting: req.trx
  })

  res.status(200).respond(quizes, (req, quiz) => ({
    ...QuizSerializer(req, quiz),
    is_complete: quiz.get('was_passed') !== null
  }))

}

export default quizesRoute
