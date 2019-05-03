import { ListRoute } from '../../../../../core/backframe'
import Competency from '../../../models/competency'
import CompetencySerializer from '../../../serializers/competency_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('competencies_competencies_resources', 'competencies_competencies_resources.competency_id', 'competencies_competencies.id')

  qb.where('competencies_competencies_resources.resource_id', req.params.resource_id)

}

const CompetencyResourcesListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['title'],
  method: 'get',
  model: Competency,
  path: '',
  serializer: CompetencySerializer
})

export default CompetencyResourcesListRoute
