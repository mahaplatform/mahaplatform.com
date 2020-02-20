import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const listRoute = async (req, res) => {

  const offerings = await Offering.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['id','title']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
