import { notifications } from '../../../../../core/services/routes/notifications'
import { audit } from '../../../../../core/services/routes/audit'
import ItemSerializer from '../../../serializers/item_serializer'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Item from '../../../models/item'

const types = ['advance','check','expense','reimbursement','trip']

const submitAllRoute = async (req, res) => {

  const items = await Item.query(qb => {
    types.map(type => {
      if(!req.body[`${type}_ids`]) return
      qb.orWhere(qb2 => {
        qb2.whereIn('item_id', req.body[`${type}_ids`]).andWhere('type', type)
      })
    })
    qb.whereNot('status_id', 3)
    qb.orderBy('user_id', 'asc')
  }).fetchAll({
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
    await knex(`expenses_${type}s`).transacting(req.trx).whereIn('id', models[type]).update({
      status_id: 3
    })
  })

  await audit(req, items.map(item => ({
    story: 'submitted',
    auditable: {
      tableName: `expenses_${item.get('type')}s`,
      id: item.get('item_id')
    }
  })))

  await notifications(req, items.map(item => ({
    type: 'expenses:item_submitted',
    listenable: item,
    subject_id: req.user.get('id'),
    story: 'submitted {object}',
    object: item
  })))

  await socket.refresh(req,  [{
    channel: 'team',
    target: [
      '/admin/expenses/reports',
      '/admin/expenses/approvals',
      '/admin/expenses/items',
      ...items.map(item => {
        return `/admin/expenses/${item.get('type')}s/${item.get('id')}`
      })
    ]
  }])

  res.status(200).respond(items, ItemSerializer)

}

export default submitAllRoute
