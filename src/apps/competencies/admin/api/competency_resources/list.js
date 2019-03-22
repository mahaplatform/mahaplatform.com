import { ListRoute } from 'maha'
import Resource from '../../../models/resource'
import ResourceSerializer from '../../../serializers/resource_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.resource_id', 'competencies_resources.id')

  qb.where('competencies_competencies_resources.competency_id', req.params.competency_id)

}

const CompetencyResourcesListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  method: 'get',
  model: Resource,
  path: '',
  serializer: ResourceSerializer,
  withRelated: ['competency']
})

export default CompetencyResourcesListRoute
