import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import { validate } from '../../../../../core/utils/validation'

const securityRoute = async (req, res) => {

  await validate({
    token: 'required',
    security_question_id: 'required',
    security_question_answer: 'required'
  }, req.body)

  const { user } = await loadUserFromToken('activation_id', req.body.token, req.trx)

  await user.save({
    security_question_id: req.body.security_question_id,
    security_question_answer: req.body.security_question_answer
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default securityRoute
