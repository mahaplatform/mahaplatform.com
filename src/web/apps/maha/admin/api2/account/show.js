const showRoute = (req, res) => {

  res.status(200).respond({
    first_name: req.user.get('first_name'),
    last_name: req.user.get('last_name'),
    email: req.user.get('email'),
    secondary_email: req.user.get('secondary_email'),
    photo_id: req.user.get('photo_id'),
    notification_method: req.user.get('notification_method'),
    security_question_id: req.user.get('security_question_id'),
    security_question_answer: req.user.get('security_question_answer')
  })

}

export default showRoute
