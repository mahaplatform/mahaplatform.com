import { loadUserFromToken } from '../../../core/utils/user_tokens'
import { Route, BackframeError } from '../../../server'

const processor = async (req, trx, options) => {

  const { user } = await loadUserFromToken('activation_id', req.body.token, trx)

  const data = {
    security_question_id: req.body.security_question_id,
    security_question_answer: req.body.security_question_answer
  }

  await user.save(data, { patch: true, transacting: trx })

  return true

}

const rules = {
  token: 'required',
  security_question_id: 'required',
  security_question_answer: 'required'
}

const securityRoute = new Route({
  path: '/security',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default securityRoute
