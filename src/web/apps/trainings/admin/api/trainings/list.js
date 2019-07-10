import TrainingSerializer from '../../../serializers/training_serializer'
import Training from '../../../models/training'

const listRoute = async (req, res) => {

  const trainings = await Training.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['id','title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(trainings, TrainingSerializer)

}

export default listRoute
