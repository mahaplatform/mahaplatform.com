import TrainingSerializer from '../../../serializers/training_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import { updateMaterials } from '../../../services/materials'
import Training from '../../../models/training'

const createRoute = async (req, res) => {

  const training = await Training.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','description','type','url','location','contact','notes','is_verification_required'])
  }).save(null, {
    transacting: req.trx
  })

  if(req.body.asset_ids) {
    await updateMaterials(req, {
      training_id: training.get('id'),
      asset_ids: req.body.asset_ids
    })
  }

  await activity(req, {
    story: 'created {object}',
    object: training
  })

  await socket.refresh(req, [
    '/admin/training/trainings'
  ])

  res.status(200).respond(training, TrainingSerializer)

}

export default createRoute
