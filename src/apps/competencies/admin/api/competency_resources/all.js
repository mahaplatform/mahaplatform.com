import { ListRoute } from 'maha'
import Resource from '../../../models/resource'
import ResourceSerializer from '../../../serializers/resource_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (competencies_resources.id,competencies_resources.title,competencies_resources.url) competencies_resources.*'))

  qb.leftJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')

}

const classificationExpectationsAllListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  method: 'get',
  model: Resource,
  name: 'all',
  path: '/all',
  sortParams: ['id','title','description','url','created_at'],
  searchParams: ['title','description','url'],
  seerializer: ResourceSerializer
})

export default classificationExpectationsAllListRoute
