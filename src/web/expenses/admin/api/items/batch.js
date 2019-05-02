import { Route } from 'maha'
import Item from '../../../models/item'

const batchRoute = (path, story, status_id, roles) => {

  const audit = async (req, trx, result, options) => result.map(item => ({
    story,
    auditable: {
      tableName: `expenses_${item.get('type')}s`,
      id: item.get('id')
    }
  }))

  const notification = async (req, trx, result, options) => await Promise.mapSeries(result, async object => {

    await object.load(['listenings'], { transacting: trx })

    const recipient_ids = object.related('listenings').filter(listener => {

      return listener.get('user_id') !== req.user.get('id')

    }).map(listener => listener.get('user_id'))

    return {
      type: `expenses:item_${story}`,
      recipient_ids,
      subject_id: req.user.get('id'),
      story: `${story} {object}`,
      object
    }

  })

  const processor = async (req, trx, options) => {

    const items = await Item.query(qb => {

      const types = ['advance','check','expense','reimbursement','trip']

      types.map(type => {

        if(!req.body[`${type}_ids`]) return

        qb.orWhere(qb2 => {

          qb2.where({ type }).andWhere('item_id', 'in', req.body[`${type}_ids`] )

        })

      })

      qb.orderBy('user_id', 'asc')

    }).fetchAll({
      withRelated: ['project.members','expense_type'],
      transacting: trx
    }).then(result => result.toArray())

    const models = items.reduce((models, item) => ({
      ...models,
      [item.get('type')]: [
        ...models[item.get('type')] || [],
        item.get('item_id')
      ]
    }), {})

    await Promise.map(Object.keys(models), async type => {

      await options.knex(`expenses_${type}s`).transacting(trx).whereIn('id', models[type]).update({ status_id })

    })

    return items

  }

  const refresh = (req, trx, result, options) => [
    {
      channel: 'team',
      target: [
        '/admin/expenses/reports',
        '/admin/expenses/approvals',
        '/admin/expenses/items',
        ...result.map(item => `/admin/expenses/${item.get('type')}s/${item.get('id')}`)
      ]
    }
  ]

  return new Route({
    audit,
    method: 'patch',
    notification,
    path,
    processor,
    refresh
  })

}

export default batchRoute
