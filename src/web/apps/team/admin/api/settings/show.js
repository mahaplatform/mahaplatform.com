const showRoute = async (req, res) => {

  await req.team.load('logo', {
    transacting: req.trx
  })

  const Serializer = (req, trx, result) => ({
    title: result.get('title'),
    subdomain: result.get('subdomain'),
    logo_id: result.get('logo_id'),
    logo: result.related('logo').get('path')
  })

  res.status(200).respond(req.team, (team) => {
    return Serializer(req, team)
  })

}

export default showRoute
