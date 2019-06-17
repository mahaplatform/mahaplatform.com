import { ListRoute } from '../../../../../core/backframe'
import Competency from '../../../models/competency'
import CompetencySerializer from '../../../serializers/competency_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (competencies_competencies.id,competencies_competencies.title) competencies_competencies.*'))

  qb.leftJoin('competencies_competencies_resources', 'competencies_competencies_resources.competency_id', 'competencies_competencies.id')

  qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')

}

const resourceCompetenciesAllListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  filterParams: ['category_id','classification_id','level'],
  method: 'get',
  model: Competency,
  name: 'all',
  path: '/all',
  sortParams: ['id','title','description'],
  searchParams: ['title','description'],
  seerializer: CompetencySerializer
})

export default resourceCompetenciesAllListRoute
