import OfferingSerializer from '../../../serializers/offering_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Offering from '../../../models/offering'

const createRoute = async (req, res) => {

  const offering = await Offering.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','photo_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: offering
  })

  await socket.refresh(req, [
    '/admin/eatfresh/offerings'
  ])

  res.status(200).respond(offering, (offering) => {
    return OfferingSerializer(req, offering)
  })

}

export default createRoute
