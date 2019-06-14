import { ListRoute } from '../../../../../core/backframe'
import Expectation from '../../../models/expectation'
import ExpectationSerializer from '../../../serializers/expectation_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ classification_id: req.params.classification_id })

}

const ClassificationExpectationsResources = new ListRoute({
  defaultQuery,
  defaultSort: ['-created_at'],
  method: 'get',
  model: Expectation,
  path: '',
  serializer: ExpectationSerializer,
  withRelated: ['competency']
})

export default ClassificationExpectationsResources
