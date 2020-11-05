import OfferingSerializer from '@apps/training/serializers/offering_serializer'
import Offering from '@apps/training/models/offering'

const listRoute = async (req, res) => {

  const offerings = await Offering.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['training_id']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-date'
    },
    page: req.query.$page,
    withRelated: ['training','fulfillments'],
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
