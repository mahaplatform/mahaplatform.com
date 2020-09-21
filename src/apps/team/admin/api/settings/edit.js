const editRoute = async (req, res) => {

  res.status(200).respond(req.team, {
    fields: [
      'id',
      'title',
      'subdomain',
      'address',
      'logo_id'
    ]
  })

}

export default editRoute
