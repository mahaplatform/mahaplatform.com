const fieldsRoute = async (req, res) => {

  const fields = [
    'first_name',
    'last_name',
    'email',
    'phone'
  ]

  res.status(200).respond(fields)

}

export default fieldsRoute
