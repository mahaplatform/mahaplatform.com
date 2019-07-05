import TrainingSerializer from '../../../serializers/training_serializer'
import { updateAttachments } from '../../../../maha/services/attachments'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Training from '../../../models/training'

const createRoute = async (req, res) => {

  const training = await Training.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','description'])
  }).save(null, {
    transacting: req.trx
  })

  await updateAttachments(req, {
    attachable: training,
    asset_ids: req.body.asset_ids
  })

  await activity(req, {
    story: 'created {object}',
    object: training
  })

  await socket.refresh(req, [
    '/admin/learning/trainings'
  ])

  res.status(200).respond(training, TrainingSerializer)

}

export default createRoute
