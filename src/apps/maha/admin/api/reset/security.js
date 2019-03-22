import { Route, BackframeError } from '../../../server'

const processor = async (req, trx, options) => {

  if(!req.body.answer) {
    throw new BackframeError({
      code: 422,
      message: 'Please answer the question'
    })
  }

  const answer = req.user.get('security_question_answer')

  if(req.body.answer !== answer) {
    throw new BackframeError({
      code: 422,
      message: 'Invalid securty answer'
    })
  }

  return true

}

const rules = {
  token: 'required'
}

const securityRoute = new Route({
  path: '/security',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default securityRoute
