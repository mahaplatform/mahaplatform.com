import { createCheck, updateCheck, destroyCheck } from '../../../services/checks'
import CheckSerializer from '../../../serializers/check_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Check from '../../../models/check'

const updateRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['line_items'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  const checks = await Promise.mapSeries(req.body.line_items, async(data) => {

    if(data.id) {

      const line_item = check.related('line_items').find(line_item => {
        return line_item.get('id') === data.id
      })

      return await updateCheck(req, line_item, {
        ...req.body,
        ...data
      })

    }

    return await createCheck(req, {
      user_id: check.get('user_id'),
      code: check.get('code'),
      ...req.body,
      ...data
    })

  })

  await Promise.map(check.related('line_items'), async (line_item) => {

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
