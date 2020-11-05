import { notifications } from '@core/services/routes/notifications'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Item from '../../../models/item'

const submitAllRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
      qb.where('status', 'pending')
      qb.orderBy('user_id', 'asc')
    },
    filter: {
      params: req.body.filter
    },
    withRelated: ['project.members','expense_type'],
    transacting: req.trx
  }).then(result => result.toArray())

  const models = items.reduce((models, item) => ({
    ...models,
    [item.get('type')]: [
      ...models[item.get('type')] || [],
      item.get('item_id')
    ]
  }), {})

  await Promise.map(Object.keys(models), async type => {
    await req.trx(`finance_${type}s`)
      .whereIn('id', models[type])
      .update({
        status: 'submitted'
      })
  })

  await audit(req, items.map(item => ({
    story: 'submitted',
    auditable: {
      tableName: `finance_${item.get('type')}s`,
      id: item.get('item_id')
    }
  })))

  await notifications(req, items.map(item => ({
    type: 'finance:item_submitted',
    listenable: item,
    subject_id: req.user.get('id'),
    story: 'submitted {object}',
    object: item
  })))

  await socket.refresh(req, [
    ...items.map(item => `/admin/finance/${item.get('type')}s/${item.get('id')}`),
    '/admin/finance/reports',
    '/admin/finance/approvals',
    '/admin/finance/items'
  ])

  res.status(200).respond(true)

}

export default submitAllRoute
