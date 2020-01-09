const fieldsRoute = async (req, res) => {

  const fields = [
    'first_name',
    'last_name',
    ...Array(3).fill(0).reduce((emails, i, j) => [
      ...emails,
      `email${j+1}`
    ], []),
    ...Array(3).fill(0).reduce((phones, i, j) => [
      ...phones,
      `phone${j+1}`
    ], []),
    ...Array(3).fill(0).reduce((addresses, i, j) => [
      ...addresses,
      `address${j+1}_street_1`,
      `address${j+1}_street_2`,
      `address${j+1}_city`,
      `address${j+1}_state_province`,
      `address${j+1}_postal_code`
    ], [])
  ]

  res.status(200).respond(fields)

}

export default fieldsRoute
