const editRoute = async (req, res) => {

  await res.status(200).respond(req.team, {
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
