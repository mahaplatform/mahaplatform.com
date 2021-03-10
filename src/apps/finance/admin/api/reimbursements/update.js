import { createReimbursement, updateReimbursement, destroyReimbursement } from '@apps/finance/services/reimbursements'
import ReimbursementSerializer from '@apps/finance/serializers/reimbursement_serializer'
import socket from '@core/services/routes/emitter'
import Reimbursement from '@apps/finance/models/reimbursement'

const getAllocations = (item, allocations) => {
  const items = !allocations || allocations.length === 0 ? [{}] : allocations
  return items.map((allocation, index) => ({
    ...allocation,
    id: index === 0 && !allocation.id ? item.get('id') : allocation.id
  }))
}

const updateRoute = async (req, res) => {

  const reimbursement = await Reimbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['allocations'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  const allocations = await Reimbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', reimbursement.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_allocations = getAllocations(reimbursement, req.body.allocations)

  const reimbursements = await Promise.mapSeries(new_allocations, async(data) => {

    if(!data.id) {
      return await createReimbursement(req, {
        user_id: reimbursement.get('user_id'),
        code: reimbursement.get('code'),
        ...req.body,
        ...data
      })
    }

    const allocation = allocations.find(allocation => {
      return allocation.get('id') === data.id
    })

    return await updateReimbursement(req, allocation, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(allocations, async (allocation) => {

    const found = reimbursements.find(reimbursement => {
      return reimbursement.get('id') === allocation.get('id')
    })

    if(!found) await destroyReimbursement(req, allocation)

  })

  await socket.refresh(req, [
    ...reimbursements.map(reimbursement => `/admin/finance/reimbursements/${reimbursement.get('id')}`),
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  await res.status(200).respond(reimbursement, ReimbursementSerializer)

}

export default updateRoute
