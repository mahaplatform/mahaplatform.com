import QuizSerializer from '../../../serializers/quiz_serializer'
import knex from '../../../../../core/services/knex'
import Quiz from '../../../models/quiz'

const quizesRoute = async (req, res) => {

  const quizes = await Quiz.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('training_quizes.*,training_administrations.was_passed'))
    qb.joinRaw('left join training_administrations on training_administrations.quiz_id=training_quizes.id and training_administrations.user_id=?', req.user.get('id'))
    qb.innerJoin('training_fulfillments','training_fulfillments.training_id','training_quizes.training_id')
    qb.where('training_fulfillments.id', req.params.assignment_id)
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
