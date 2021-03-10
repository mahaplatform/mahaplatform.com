import SecurityQuestionSerializer from '@apps/maha/serializers/security_question_serializer'
import SecurityQuestion from '@apps/maha/models/security_question'

const listRoute = async (req, res) => {

  const security_questions = await SecurityQuestion.fetchAll({
    transacting: req.trx
  })

  await res.status(200).respond(security_questions, SecurityQuestionSerializer)

}

export default listRoute
