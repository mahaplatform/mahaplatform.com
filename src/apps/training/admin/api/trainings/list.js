import TrainingSerializer from '../../../serializers/training_serializer'
import Training from '../../../models/training'

const listRoute = async (req, res) => {

  const trainings = await Training.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['type'],
      search: ['id','title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(trainings, TrainingSerializer)

}

export default listRoute
