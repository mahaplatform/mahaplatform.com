import QuestionSerializer from '../../../../serializers/question_serializer'
import Question from '../../../../models/question'

const listRoute = async (req, res) => {

  const questions = await Question.scope({
    team: req.team
  }).query(qb => {
    qb.where('quiz_id', req.params.quiz_id)
  }).sort({
    defaultSort: 'delta'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(questions, QuestionSerializer)

}

export default listRoute
