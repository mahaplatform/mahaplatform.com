import WebsiteSerializer from '@apps/websites/serializers/website_serializer'
import Website from '@apps/websites/models/website'

const showRoute = async (req, res) => {

  const website = await Website.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!website) return res.status(404).respond({
    code: 404,
    message: 'Unable to load website'
  })

  await res.status(200).respond(website, WebsiteSerializer)

}

export default showRoute
