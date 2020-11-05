import OfferingSerializer from '@apps/training/serializers/offering_serializer'
import Offering from '@apps/training/models/offering'
import moment from 'moment'

const listRoute = async (req, res) => {

  const offerings = await Offering.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select(req.trx.raw('training_offerings.*, count(training_fulfillments.id)::int as fulfillments_count'))
    qb.leftJoin('training_fulfillments', 'training_fulfillments.offering_id', 'training_offerings.id')
    qb.where('training_offerings.training_id', req.params.training_id)
    qb.whereRaw('training_offerings.date > ?', moment())
    qb.groupBy('training_offerings.id')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
