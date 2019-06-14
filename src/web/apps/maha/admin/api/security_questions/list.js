import SecurityQuestionSerializer from '../../../serializers/security_question_serializer'
import SecurityQuestion from '../../../models/security_question'

const listRoute = async (req, res) => {

  const security_questions = await SecurityQuestion.fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(security_questions, (security_question) => {
    return SecurityQuestionSerializer(req, req.trx, security_question)
  })

}

export default listRoute
