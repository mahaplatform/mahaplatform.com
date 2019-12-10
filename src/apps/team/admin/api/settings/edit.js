const editRoute = async (req, res) => {

  res.status(200).respond(req.team, {
    fields: [
      'id',
      'title',
      'subdomain',
      'address',
      'logo_id',
      'authentication_strategy'
    ]
  })

}

export default editRoute
