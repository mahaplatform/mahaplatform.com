import OfferingSerializer from '../../../serializers/offering_serializer'
import Offering from '../../../models/offering'

const showRoute = async (req, res) => {

  const offering = await Offering.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['training'],
    transacting: req.trx
  })

  if(!offering) return res.status(404).respond({
    code: 404,
    message: 'Unable to load offering'
  })

  res.status(200).respond(offering, OfferingSerializer)

}

export default showRoute
