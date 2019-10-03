import OfferingSerializer from '../../../serializers/offering_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Offering from '../../../models/offering'

const updateRoute = async (req, res) => {

  const offering = await Offering.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!offering) return res.status(404).respond({
    code: 404,
    message: 'Unable to load offering'
  })

  await offering.save({
    ...whitelist(req.body, ['date','starts_at','ends_at','location','facilitator','limit'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: offering
  })

  await socket.refresh(req, [
    '/admin/training/offerings',
    `/admin/training/offerings/${offering.get('id')}`
  ])

  res.status(200).respond(offering, OfferingSerializer)

}

export default updateRoute
