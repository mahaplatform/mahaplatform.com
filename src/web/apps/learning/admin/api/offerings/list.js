import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const listRoute = async (req, res) => {

  const offerings = await Offering.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['id','title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-date'
  }).fetchPage({
    withRelated: ['training'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
