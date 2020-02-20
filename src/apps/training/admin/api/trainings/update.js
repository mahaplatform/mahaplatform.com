import TrainingSerializer from '../../../serializers/training_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import { updateMaterials } from '../../../services/materials'
import Training from '../../../models/training'

const updateRoute = async (req, res) => {

  const training = await Training.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!training) return res.status(404).respond({
    code: 404,
    message: 'Unable to load training'
  })

  await training.save({
    ...whitelist(req.body, ['title','description','type','url','location','contact','notes','is_verification_required'])
  }, {
    patch: true,
    transacting: req.trx
  })

  if(req.body.asset_ids) {
    await updateMaterials(req, {
      training_id: training.get('id'),
      asset_ids: req.body.asset_ids
    })
  }

  await activity(req, {
    story: 'updated {object}',
    object: training
  })

  await socket.refresh(req, [
    '/admin/training/trainings',
    `/admin/training/trainings/${training.get('id')}`
  ])

  res.status(200).respond(training, TrainingSerializer)

}

export default updateRoute
