const showRoute = (req, res) => {

  res.status(200).respond(req.user, {
    fields: [
      'first_name',
      'last_name',
      'email',
      'cell_phone',
      'photo_id',
      'notification_method',
      'security_question_id',
      'security_question_answer'
    ]
  })

}

export default showRoute
