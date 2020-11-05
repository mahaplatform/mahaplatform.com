import OfferingSerializer from '@apps/training/serializers/offering_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Offering from '@apps/training/models/offering'

const createRoute = async (req, res) => {

  const offering = await Offering.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['training_id','date','starts_at','ends_at','location','facilitator','limit'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: offering
  })

  await socket.refresh(req, [
    '/admin/training/offerings'
  ])

  res.status(200).respond(offering, OfferingSerializer)

}

export default createRoute
