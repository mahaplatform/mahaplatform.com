import CompetencySerializer from '../../../../serializers/competency_serializer'
import Competency from '../../../../models/competency'

const listRoute = async (req, res) => {

  const competencies = await Competency.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.competency_id', 'competencies_competencies.id')
    qb.where('competencies_competencies_resources.resource_id', req.params.resource_id)
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['category'],
    transacting: req.trx
  })

  res.status(200).respond(competencies, CompetencySerializer)

}

export default listRoute
