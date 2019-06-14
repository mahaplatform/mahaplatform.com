import CompetencySerializer from '../../../serializers/competency_serializer'
import Competency from '../../../models/competency'
import knex from '../../../../../core/services/knex'

const listRoute = async (req, res) => {

  const competencies = await Competency.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('distinct on (competencies_competencies.id,competencies_competencies.title,competencies_competencies.level,competencies_competencies.created_at) competencies_competencies.*'))
    qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')
    qb.leftJoin('competencies_classifications', 'competencies_classifications.id', 'competencies_competencies.id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['category_id','competencies_expectations.classification_id','level'],
    searchParams: ['title','description']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title','level','competencies_categories.title']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(competencies, (competency) => {
    return CompetencySerializer(req, competency)
  })

}

export default listRoute
