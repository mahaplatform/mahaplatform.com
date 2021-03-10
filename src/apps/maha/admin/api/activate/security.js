import { validate } from '@core/utils/validation'

const securityRoute = async (req, res) => {

  await validate({
    token: 'required',
    security_question_id: 'required',
    security_question_answer: 'required'
  }, req.body)

  await req.account.save({
    security_question_id: req.body.security_question_id,
    security_question_answer: req.body.security_question_answer
  }, {
    patch: true,
    transacting: req.trx
  })

  await res.status(200).respond(true)

}

export default securityRoute
