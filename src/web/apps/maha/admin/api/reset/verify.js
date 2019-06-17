import SecurityQuestion from '../../../models/security_question'

const securityRoute = async (req, res, next) => {

  const security_question = await SecurityQuestion.where({
    id: req.user.get('security_question_id')
  }).fetch({
    transacting: req.trx
  })

  if(!security_question) return res.status(404).json({
    code: 404,
    message: 'Unable to find security question'
  })

  await req.user.load('photo', {
    transacting: req.trx
  })

  res.status(200).respond({
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
  })

}

export default securityRoute
