const fieldsRoute = async (req, res) => {

  const fields = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'street_1',
    'street_2',
    'city',
    'state_province',
    'postal_code'
  ]

  res.status(200).respond(fields)

}

export default fieldsRoute
