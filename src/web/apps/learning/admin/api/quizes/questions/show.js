import QuestionSerializer from '../../../../serializers/question_serializer'
import Question from '../../../../models/question'

const showRoute = async (req, res) => {

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

  res.status(200).respond(question, QuestionSerializer)

}

export default showRoute
