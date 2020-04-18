import { activity } from '../../../../../core/services/routes/activities'
import SecurityQuestion from '../../../models/security_question'
import { validate } from '../../../../../core/utils/validation'

const verifyRoute = async (req, res) => {

  await validate({
    token: 'required'
  }, req.body)

  if(req.user.get('activated_at')) return res.status(404).json({
    code: 404,
    message: 'This account has already been activated'
  })

  await activity(req, {
    story: 'claimed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'account activation',
    object_type: null
  })

  const questions = await SecurityQuestion.fetchAll({
    transacting: req.trx
  })

  res.status(200).respond({
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
    team: {
      id: req.team.get('id'),
      authentication_strategy: req.team.get('authentication_strategy'),
      title: req.team.get('title')
    },
    questions: questions.map(question => ({
      id: question.get('id'),
      text: question.get('text')
    }))
  })

}

export default verifyRoute
