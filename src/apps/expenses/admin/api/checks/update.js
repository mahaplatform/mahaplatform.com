import { createCheck, updateCheck, destroyCheck } from '../../../services/checks'
import CheckSerializer from '../../../serializers/check_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Check from '../../../models/check'

const getLineItems = (item, line_items) => {
  const items = !line_items || line_items.length === 0 ? [{}] : line_items
  return items.map((line_item, index) => ({
    ...line_item,
    id: index === 0 && !line_item.id ? item.get('id') : line_item.id
  }))
}

const updateRoute = async (req, res) => {

  const check = await Check.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  const line_items = await Check.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', check.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_line_items = getLineItems(check, req.body.line_items)

  const checks = await Promise.mapSeries(new_line_items, async(data) => {

    if(!data.id) {
      return await createCheck(req, {
        user_id: check.get('user_id'),
        code: check.get('code'),
        ...req.body,
        ...data
      })
    }

    const line_item = line_items.find(line_item => {
      return line_item.get('id') === data.id
    })

    return await updateCheck(req, line_item, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(line_items, async (line_item) => {

    const found = checks.find(check => {
      return check.get('id') === line_item.get('id')
    })

    if(!found) await destroyCheck(req, line_item)

  })

  await socket.refresh(req, [
    ...checks.map(check => `/admin/expenses/checks/${check.get('id')}`),
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(check, CheckSerializer)

}

export default updateRoute
