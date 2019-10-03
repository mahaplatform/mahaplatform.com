import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const listRoute = async (req, res) => {

  const offerings = await Offering.scope({
    team: req.team
  }).filter({
    filterParams: ['training_id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-date'
  }).fetchPage({
    withRelated: ['training','fulfillments'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
