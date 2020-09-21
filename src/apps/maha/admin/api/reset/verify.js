import SecurityQuestion from '../../../models/security_question'

const securityRoute = async (req, res, next) => {

  const security_question = await SecurityQuestion.where({
    id: req.account.get('security_question_id')
  }).fetch({
    transacting: req.trx
  })

  if(!security_question) return res.status(404).json({
    code: 404,
    message: 'Unable to find security question'
  })

  await req.account.load('photo', {
    transacting: req.trx
  })

  res.status(200).respond({
    account: {
      id: req.account.get('id'),
      first_name: req.account.get('first_name'),
      full_name: req.account.get('full_name'),
      initials: req.account.get('initials'),
      email: req.account.get('email'),
      photo: req.account.related('photo') ? req.account.related('photo').get('path') : null
    },
    question: {
      text: security_question.get('text')
    }
  })

}

export default securityRoute
