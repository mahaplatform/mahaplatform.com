import TrainingSerializer from '../../../serializers/training_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Training from '../../../models/training'

const updateRoute = async (req, res) => {

  const training = await Training.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!training) return res.status(404).respond({
    code: 404,
    message: 'Unable to load training'
  })

  await training.save({
    ...whitelist(req.body, ['title','description'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: training
  })

  await socket.refresh(req, [
    '/admin/learning/trainings',
    `/admin/learning/trainings/${training.get('id')}`
  ])

  res.status(200).respond(training, TrainingSerializer)

}

export default updateRoute
