import OfferingSerializer from '../../../../serializers/offering_serializer'
import knex from '../../../../../../core/services/knex'
import Offering from '../../../../models/offering'
import moment from 'moment'

const listRoute = async (req, res) => {

  const offerings = await Offering.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('training_offerings.*, count(training_assignments.id)::int as assignments_count'))
    qb.leftJoin('training_assignments', 'training_assignments.offering_id', 'training_offerings.id')
    qb.where('training_offerings.training_id', req.params.training_id)
    qb.whereRaw('training_offerings.date > ?', moment())
    qb.groupBy('training_offerings.id')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
