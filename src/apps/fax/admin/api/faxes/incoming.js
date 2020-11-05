import FaxSerializer from '@apps/fax/serializers/fax_serializer'
import Fax from '@apps/maha/models/fax'

const incomingRoute = async (req, res) => {

  const faxes = await Fax.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('direction', 'inbound')
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['from','to'],
    transacting: req.trx
  })

  res.status(200).respond(faxes, FaxSerializer)

}

export default incomingRoute
