import { ListRoute } from 'maha'
import Competency from '../../../models/competency'
import CompetencySerializer from '../../../serializers/competency_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (competencies_competencies.id,competencies_competencies.title,competencies_competencies.level,competencies_competencies.created_at) competencies_competencies.*'))

  qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies.id')

  qb.leftJoin('competencies_categories', 'competencies_categories.id', 'competencies_competencies.category_id')

}

const classificationExpectationsAllListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  filterParams: ['category_id','level'],
  method: 'get',
  model: Competency,
  name: 'all',
  path: '/all',
  sortParams: ['title','created_at'],
  searchParams: ['title','description'],
  seerializer: CompetencySerializer
})

export default classificationExpectationsAllListRoute
