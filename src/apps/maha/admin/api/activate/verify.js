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
    account: {
      id: req.account.get('id'),
      first_name: req.account.get('first_name'),
      last_name: req.account.get('last_name'),
      full_name: req.account.get('full_name'),
      initials: req.account.get('initials'),
      email: req.account.get('email'),
      cell_phone: req.account.get('cell_phone'),
      photo_id: req.account.get('photo_id'),
      photo: req.account.related('photo') ? req.account.related('photo').get('path') : null,
      authentication_strategy: req.account.get('authentication_strategy'),
      activated_at: req.account.get('activated_at'),
      security_question_id: req.account.get('security_question_id')
    },
    user: {
      id: req.user.get('id'),
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      full_name: req.user.get('full_name'),
      initials: req.user.get('initials'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      photo: req.user.related('photo') ? req.user.related('photo').get('path') : null,
      activated_at: req.account.get('activated_at')
    },
    team: {
      id: req.team.get('id'),
      title: req.team.get('title')
    },
    questions: questions.map(question => ({
      id: question.get('id'),
      text: question.get('text')
    }))
  })

}

export default verifyRoute
