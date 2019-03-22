import SecurityQuestion from '../../../models/security_question'
import { Route, BackframeError } from '../../../server'

const processor = async (req, trx, options) => {

  const id = req.user.get('security_question_id')

  const security_question = await SecurityQuestion.where({ id }).fetch({ transacting: trx })

  if(!security_question) {
    throw new BackframeError({
      code: 404,
      message: 'Unable to find security question'
    })
  }

  await req.user.load('photo', { transacting: trx })

  return {
    user: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      full_name: req.user.get('full_name'),
      initials: req.user.get('initials'),
      email: req.user.get('email'),
      photo: req.user.related('photo').get('path')
    },
    question: {
      text: security_question.get('text')
    }
  }

}

const rules = {
  token: 'required'
}

const verifyRoute = new Route({
  path: '/verify',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default verifyRoute
