import CompetencySerializer from '@apps/learning/serializers/competency_serializer'
import Competency from '@apps/learning/models/competency'

const listRoute = async (req, res) => {

  const competencies = await Competency.filterFetch({
    scope: qb => {
      qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.competency_id', 'competencies_competencies.id')
      qb.where('competencies_competencies_resources.resource_id', req.params.resource_id)
      qb.where('competencies_competencies.team_id', req.team.get('id'))
    },
    page: req.query.$page,
    withRelated: ['category'],
    transacting: req.trx
  })

  res.status(200).respond(competencies, CompetencySerializer)

}

export default listRoute
