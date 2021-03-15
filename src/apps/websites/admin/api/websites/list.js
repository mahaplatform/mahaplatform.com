import WebsiteSerializer from '@apps/websites/serializers/website_serializer'
import Website from '@apps/websites/models/website'

const listRoute = async (req, res) => {

  const website = await Website.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(website, WebsiteSerializer)

}

export default listRoute
