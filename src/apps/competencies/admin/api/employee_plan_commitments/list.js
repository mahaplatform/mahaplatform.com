import { ListRoute } from 'maha'
import Commitment from '../../../models/commitment'
import CommitmentSerializer from '../../../serializers/commitment_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ plan_id: req.params.plan_id })

}

const employeePlanCommitmentsListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['-created_at'],
  method: 'get',
  model: Commitment,
  path: '',
  serializer: CommitmentSerializer,
  withRelated: ['resource']
})

export default employeePlanCommitmentsListRoute
