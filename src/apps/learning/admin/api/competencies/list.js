import CompetencySerializer from '../../../serializers/competency_serializer'
import Competency from '../../../models/competency'

const listRoute = async (req, res) => {

  const competencies = await Competency.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('distinct on (competencies_competencies.id,competencies_competencies.title,competencies_competencies.level,competencies_competencies.created_at) competencies_competencies.*'))
      qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')
      qb.leftJoin('competencies_classifications', 'competencies_classifications.id', 'competencies_competencies.id')
      qb.where('competencies_competencies.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['category_id','competencies_expectations.classification_id','level'],
      search: ['title','description']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['id','title','level','competencies_categories.title']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(competencies, CompetencySerializer)

}

export default listRoute
