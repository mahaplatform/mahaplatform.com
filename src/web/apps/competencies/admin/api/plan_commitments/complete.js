import { Route } from '../../../../../core/backframe'
import Commitment from '../../../models/commitment'
import CommitmentSerializer from '../../../serializers/commitment_serializer'

const processor = async (req, trx, options) => {

  const conditions = {
    plan_id: req.params.plan_id,
    id: req.params.id
  }

  const commitment = await Commitment.where(conditions).fetch({ transacting: trx })

  const data = {
    is_complete: true,
    comments: req.body.comments
  }

  await commitment.save(data, { patch: true, transacting: trx })

  return CommitmentSerializer(req, trx, commitment)

}

const refresh = (req, trx, result, options) => [
  '/admin/competencies/plans',
  `/admin/competencies/plans/${req.params.plan_id}`
]

const completeRoute = new Route({
  path: '/:id/complete',
  method: 'patch',
  processor,
  refresh
})

export default completeRoute
