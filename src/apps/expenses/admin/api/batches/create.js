import { notifications } from '../../../../../web/core/services/routes/notifications'
import { audit } from '../../../../../web/core/services/routes/audit'
import BatchSerializer from '../../../serializers/batch_serializer'
import socket from '../../../../../web/core/services/routes/emitter'
import Batch from '../../../models/batch'
import Item from '../../../models/item'
import moment from 'moment'

const createRoute = async (req, res) => {

  const query = qb => {
    const types = ['advance','check','expense','reimbursement','trip']
    types.map(type => {
      if(!req.body[`${type}_ids`]) return
      qb.orWhere(qb2 => {
        qb2.where({ type }).andWhere('item_id', 'in', req.body[`${type}_ids`] )
      })
    })
    qb.orderBy('user_id', 'asc')
  }

  const batchItems = await Item.query(query).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const total = batchItems.reduce((total, item) => {
    return total + parseFloat(item.get('amount'))
  }, 0.00)

  const batch = await Batch.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    integration: 'accpac',
    items_count: batchItems.length,
    total: total.toFixed(2),
    date: req.body.date || moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: req.trx
  })

  await batch.load(['user.photo'], {
    transacting: req.trx
  })

  const models = batchItems.reduce((models, item) => ({
    ...models,
    [item.get('type')]: [
      ...models[item.get('type')] || [],
      item.get('item_id')
    ]
  }), {})

  await Promise.map(Object.keys(models), async type => {
    await req.trx(`expenses_${type}s`)
      .whereIn('id', models[type])
      .update({
        batch_id: batch.get('id'),
        status_id: 7
      })
  })

  const items = await Item.query(query).fetchAll({
    withRelated: ['expense_type','project','user','vendor','account'],
    transacting: req.trx
  }).then(result => result.toArray())

  await audit(req, items.map(item => ({
    story: 'processed',
    auditable: {
      tableName: `expenses_${item.get('type')}s`,
      id: item.get('item_id')
    }
  })))

  await socket.refresh(req, [
    ...items.map(item => `/admin/expenses/${item.get('type')}s/${item.get('id')}`),
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    '/admin/expenses/items'
  ])

  await notifications(req, await Promise.mapSeries(items, async item => ({
    type: 'expenses:item_processed',
    listenable: item,
    subject_id: req.user.get('id'),
    story: 'processed {object}',
    object: item
  })))

  res.status(200).respond(batch, BatchSerializer)

}

export default createRoute
