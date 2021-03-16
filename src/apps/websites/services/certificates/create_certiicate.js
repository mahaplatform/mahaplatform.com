import Certificate from '@apps/websites/models/certificate'

const createCertificate = async(req, { website, domains }) => {

  const certificate = await Certificate.forge({
    team_id: req.team.get('id'),
    website_id: website.get('id'),
    
  }).save(null, {

  })

  const cert = await requestCertificate(req, {
    aliases,
    name
  })

}

export default createCertificate
