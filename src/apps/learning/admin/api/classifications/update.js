import ClassificationSerializer from '../../../serializers/classification_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Classification from '../../../models/classification'

const updateRoute = async (req, res) => {

  const classification = await Classification.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!classification) return res.status(404).respond({
    code: 404,
    message: 'Unable to load classification'
  })

  await classification.save({
    ...whitelist(req.body, ['title'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: classification
  })

  await socket.refresh(req, [
    '/admin/learning/classifications',
    `/admin/learning/classifications/${classification.get('id')}`
  ])

  res.status(200).respond(classification, ClassificationSerializer)

}

export default updateRoute
