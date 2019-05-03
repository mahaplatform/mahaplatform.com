import SecurityQuestion from '../../../models/security_question'
import { BackframeError, Route } from '../../../../../core/backframe'

const activity = (req, trx, result, options) => ({
  story: 'claimed {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'account activation',
  object_type: null
})

const processor = async (req, trx, options) => {

  await req.user.load(['photo'], { transacting: trx })

  if(req.user.get('activated_at')) {
    throw new BackframeError({
      code: 404,
      message: 'This account has already been activated'
    })
  }

  const questions = await SecurityQuestion.fetchAll({ transacting: trx })

  return {
    user: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      full_name: req.user.get('full_name'),
      initials: req.user.get('initials'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      photo: req.user.related('photo').get('path')
    },
    questions: questions.map(question => ({
      id: question.get('id'),
      text: question.get('text')
    }))
  }

}

const rules = {
  token: 'required'
}

const verifyRoute = new Route({
  activity,
  path: '/verify',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default verifyRoute
