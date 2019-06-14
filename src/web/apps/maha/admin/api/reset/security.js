const securityRoute = async (req, res, next) => {

  if(!req.body.answer) return res.status(422).json({
    code: 422,
    message: 'Please answer the question'
  })

  const answer = req.user.get('security_question_answer').toLowerCase()

  if(req.body.answer.toLowerCase() !== answer) return res.status(422).json({
    code: 422,
    message: 'Invalid securty answer'
  })

  res.status(200).respond(true)

}

export default securityRoute
