import OfferingSerializer from '../../../../serializers/offering_serializer'
import { activity } from '../../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../../web/core/services/routes/params'
import socket from '../../../../../../web/core/services/routes/emitter'
import Offering from '../../../../models/offering'

const createRoute = async (req, res) => {

  const offering = await Offering.forge({
    team_id: req.team.get('id'),
    training_id: req.params.training_id,
    ...whitelist(req.body, ['date','starts_at','ends_at','location','facilitator','limit'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: offering
  })

  await socket.refresh(req, [
    `/admin/training/trainings/${req.params.training_id}`,
    `/admin/training/trainings/${req.params.training_id}/offerings`
  ])

  res.status(200).respond(offering, OfferingSerializer)

}

export default createRoute
