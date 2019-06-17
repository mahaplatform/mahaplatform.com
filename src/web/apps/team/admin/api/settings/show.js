const showRoute = async (req, res) => {

  await req.team.load('logo', {
    transacting: req.trx
  })

  res.status(200).respond(req.team, (req, result) => ({
    title: result.get('title'),
    subdomain: result.get('subdomain'),
    logo_id: result.get('logo_id'),
    logo: result.related('logo').get('path')
  }))

}

export default showRoute
