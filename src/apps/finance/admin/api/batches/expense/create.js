import { notifications } from '@core/services/routes/notifications'
import { audit } from '@core/services/routes/audit'
import BatchSerializer from '@apps/finance/serializers/batch_serializer'
import socket from '@core/services/routes/emitter'
import Batch from '@apps/finance/models/batch'
import Item from '@apps/finance/models/item'
import moment from 'moment'

const createRoute = async (req, res) => {

  const batchItems = await Item.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('status', 'reviewed')
    },
    filter: {
      params: req.body.filter
    },
    transacting: req.trx
  }).then(result => result.toArray())

  const settings = req.app.get('settings')

  const batch = await Batch.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    type: 'expense',
    integration: settings.integration,
    date: req.body.date || moment().format('YYYY-MM-DD')
  }).save(null, {
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
    await req.trx(`finance_${type}s`)
      .whereIn('id', models[type])
      .update({
        batch_id: batch.get('id'),
        status: 'exported'
      })
  })

  await batch.load(['items','user.photo'], {
    transacting: req.trx
  })

  const items = batch.related('items').toArray()

  await audit(req, items.map(item => ({
    story: 'exported',
    auditable: {
      tableName: `finance_${item.get('type')}s`,
      id: item.get('item_id')
    }
  })))

  await socket.refresh(req, [
    ...items.map(item => `/admin/finance/${item.get('type')}s/${item.get('item_id')}`),
    '/admin/finance/approvals',
    '/admin/finance/reports',
    '/admin/finance/items'
  ])

  await notifications(req, await Promise.mapSeries(items, async item => ({
    type: 'finance:item_exported',
    listenable: item,
    subject_id: req.user.get('id'),
    story: 'exported {object}',
    object: item
  })))

  await res.status(200).respond(batch, BatchSerializer)

}

export default createRoute
