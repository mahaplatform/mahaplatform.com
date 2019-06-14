const passwordRoute = async (req, res) => {

  req.user = await req.user.save({
    security_question_id: req.body.security_question_id,
    security_question_answer: req.body.security_question_answer
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond({
    security_question_id: req.body.security_question_id,
    security_question_answer: req.body.security_question_answer
  })

}

export default passwordRoute
