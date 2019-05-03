import { ListRoute } from '../../../../../core/backframe'
import Resource from '../../../models/resource'
import ResourceSerializer from '../../../serializers/resource_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (competencies_resources.id,competencies_resources.title,competencies_resources.created_at) competencies_resources.*'))

  qb.leftJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')

  qb.leftJoin('competencies_competencies', 'competencies_competencies.id', 'competencies_competencies_resources.competency_id')

  qb.leftJoin('competencies_expectations', 'competencies_expectations.competency_id', 'competencies_competencies_resources.competency_id')


}

const employeePlanAllListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  filterParams: ['competencies_competencies.id','competencies_expectations.classification_id','competencies_competencies.level'],
  method: 'get',
  model: Resource,
  name: 'all',
  path: '/all',
  sortParams: ['title','created_at'],
  searchParams: ['title','description'],
  seerializer: ResourceSerializer
})

export default employeePlanAllListRoute
