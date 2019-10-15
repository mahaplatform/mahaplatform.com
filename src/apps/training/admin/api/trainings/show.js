import TrainingSerializer from '../../../serializers/training_serializer'
import Training from '../../../models/training'

const showRoute = async (req, res) => {

  const training = await Training.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!training) return res.status(404).respond({
    code: 404,
    message: 'Unable to load training'
  })

  res.status(200).respond(training, TrainingSerializer)

}

export default showRoute
