import ShortLinkSerializer from '../../../serializers/shortlink_serializer'
import ShortLink from '../../../../maha/models/shortlink'

const listRoute = async (req, res) => {

  const shortlinks = await ShortLink.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['code'],
      search: ['code','url']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['code','url']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(shortlinks, ShortLinkSerializer)

}

export default listRoute
