import AssigningsSerializer from '../../../serializers/assigning_serializer'
import Assigning from '../../../models/assigning'

const showRoute = async (req, res) => {

  const assigning = await Assigning.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['assigned_by','assignments'],
    transacting: req.trx
  })

  if(!assigning) return res.status(404).respond({
    code: 404,
    message: 'Unable to load assigning'
  })

  res.status(200).respond(assigning, AssigningsSerializer)

}

export default showRoute
