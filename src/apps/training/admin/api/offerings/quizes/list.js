import QuizSerializer from '../../../../serializers/quiz_serializer'
import Quiz from '../../../../models/quiz'

const listRoute = async (req, res) => {

  const quizes = await Quiz.scope(qb => {
    qb.innerJoin('training_offerings','training_offerings.training_id','training_quizes.training_id')
    qb.where('training_offerings.team_id', req.team.get('id'))
    qb.where('training_offerings.id', req.params.offering_id)
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(quizes, QuizSerializer)

}

export default listRoute
