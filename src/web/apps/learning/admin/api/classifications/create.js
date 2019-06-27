import ClassificationSerializer from '../../../serializers/classification_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Classification from '../../../models/classification'

const createRoute = async (req, res) => {

  const classification = await Classification.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: classification
  })

  await socket.refresh(req, [
    '/admin/learning/classifications'
  ])

  res.status(200).respond(classification, ClassificationSerializer)

}

export default createRoute
