import batchSerializer from '../../../serializers/batch_serializer'
import Batch from '../../../models/batch'
import Item from '../../../models/item'
import { Route } from 'maha'
import moment from 'moment'

const audit = async (req, trx, result, options) => req.items.map(item => ({
  story: 'processed',
  auditable: {
    tableName: `expenses_${item.get('type')}s`,
    id: item.get('id')
  }
}))

const processor = async (req, trx, options) => {

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
    transacting: trx
  }).then(result => result.toArray())

  const total = batchItems.reduce((total, item) => total + parseFloat(item.get('amount')), 0.00).toFixed(2)

  const batch = await Batch.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    integration: 'accpac',
    items_count: batchItems.length,
    total,
    date: req.body.date || moment().format('YYYY-MM-DD')
  }).save(null, {
    transacting: trx
  })

  const models = batchItems.reduce((models, item) => ({
    ...models,
    [item.get('type')]: [
      ...models[item.get('type')] || [],
      item.get('item_id')
    ]
  }), {})

  await Promise.map(Object.keys(models), async type => {

    await options.knex(`expenses_${type}s`).transacting(trx).whereIn('id', models[type]).update({
      batch_id: batch.get('id'),
      status_id: 7
    })

  })

  req.items = await Item.query(query).fetchAll({
    withRelated: ['expense_type','project','user','vendor','account'],
    transacting: trx
  }).then(result => result.toArray())

  batch.load(['user.photo'], {
    transacting: trx
  })

  return await batchSerializer(req, trx, batch)

}

const notification = async (req, trx, result, options) => await Promise.mapSeries(req.items, async object => {

  await object.load(['listenings'], { transacting: trx })

  const recipient_ids = object.related('listenings').filter(listener => {

    return listener.get('user_id') !== req.user.get('id')

  }).map(listener => listener.get('user_id'))

  return {
    type: 'expenses:item_processed',
    recipient_ids,
    subject_id: req.user.get('id'),
    story: 'processed {object}',
    object
  }

})

const refresh = (req, trx, result, options) => [
  {
    channel: 'team',
    target: [
      '/admin/expenses/reports',
      '/admin/expenses/approvals',
      '/admin/expenses/items',
      ...req.items.map(item => `/admin/expenses/${item.get('type')}s/${item.get('id')}`)
    ]
  }
]

const accpacRoute = new Route({
  audit,
  method: 'post',
  notification,
  path: '/',
  processor,
  refresh,
  rights: ['expenses:access_reports']
})

export default accpacRoute
