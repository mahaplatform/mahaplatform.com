import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const showRoute = async (req, res) => {

  const offering = await Offering.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!offering) return req.status(404).respond({
    code: 404,
    message: 'Unable to load offering'
  })

  res.status(200).respond(offering, (offering) => {
    return OfferingSerializer(req, offering)
  })

}

export default showRoute
