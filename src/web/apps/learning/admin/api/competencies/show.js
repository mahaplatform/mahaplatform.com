import CompetencySerializer from '../../../serializers/competency_serializer'
import Competency from '../../../models/competency'

const showRoute = async (req, res) => {

  const competency = await Competency.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['category'],
    transacting: req.trx
  })

  if(!competency) return res.status(404).respond({
    code: 404,
    message: 'Unable to load competency'
  })

  res.status(200).respond(competency, CompetencySerializer)

}

export default showRoute
