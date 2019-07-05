import OfferingSerializer from '../../../../serializers/offering_serializer'
import knex from '../../../../../../core/services/knex'
import Offering from '../../../../models/offering'
import moment from 'moment'

const listRoute = async (req, res) => {

  const offerings = await Offering.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('learning_offerings.*, count(learning_assignments.id)::int as assignments_count'))
    qb.leftJoin('learning_assignments', 'learning_assignments.offering_id', 'learning_offerings.id')
    qb.where('learning_offerings.training_id', req.params.training_id)
    qb.whereRaw('learning_offerings.date > ?', moment())
    qb.groupBy('learning_offerings.id')
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).respond(offerings, OfferingSerializer)

}

export default listRoute
