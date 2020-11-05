import { createCheck, updateCheck, destroyCheck } from '../../../services/checks'
import CheckSerializer from '../../../serializers/check_serializer'
import socket from '@core/services/routes/emitter'
import Check from '../../../models/check'

const getAllocations = (item, allocations) => {
  const items = !allocations || allocations.length === 0 ? [{}] : allocations
  return items.map((allocation, index) => ({
    ...allocation,
    id: index === 0 && !allocation.id ? item.get('id') : allocation.id
  }))
}

const updateRoute = async (req, res) => {

  const check = await Check.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  const allocations = await Check.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', check.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_allocations = getAllocations(check, req.body.allocations)

  const checks = await Promise.mapSeries(new_allocations, async(data) => {

    if(!data.id) {
      return await createCheck(req, {
        user_id: check.get('user_id'),
        code: check.get('code'),
        ...req.body,
        ...data
      })
    }

    const allocation = allocations.find(allocation => {
      return allocation.get('id') === data.id
    })

    return await updateCheck(req, allocation, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(allocations, async (allocation) => {

    const found = checks.find(check => {
      return check.get('id') === allocation.get('id')
    })

    if(!found) await destroyCheck(req, allocation)

  })

  await socket.refresh(req, [
    ...checks.map(check => `/admin/finance/checks/${check.get('id')}`),
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(check, CheckSerializer)

}

export default updateRoute
