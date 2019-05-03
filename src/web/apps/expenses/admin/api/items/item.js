import Member from '../../../models/member'
import pluralize from 'pluralize'
import { Resources } from '../../../../../core/backframe'
import action from './action'
import status from './status'
import _ from 'lodash'

const itemResources = (item) => {

  const activity = story => (req, trx, object, options) => ({
    story,
    object
  })

  const activities = {
    create: activity('created {object}'),
    update: activity('updated {object}')
  }

  const defaultParams = (req, trx, options) => ({
    user_id: req.user.get('id'),
    status_id: 1
  })

  const entry = (story) => async (req, trx, result, options) => ({
    story,
    auditable: result
  })

  const audit = {
    create: entry('created'),
    update: entry('updated'),
    destroy: entry('deleted')
  }

  const afterProcessor = async (req, trx, result, options) => {

    if(item.afterProcessor) await item.afterProcessor(req, trx, result, options)

    if(result.get('status_id') === 2 || result.get('user_id') !== req.user.get('id')) return

    const complete = item.required.reduce((complete, key) => {
      const value = result.get(key)
      return !complete ? false : (!_.isNil(value) && (!_.isArray(value) || (_.isArray(value) && value.length > 0)))
    }, true)

    if(!complete) return

    await result.save({ status_id: 2 }, { patch: true, transacting: trx })

  }

  const beforeProcessor = async (req, trx, options) => {

    if(item.beforeProcessor) await item.beforeProcessor(req, trx, options)

    await req.resource.load(['audit','comments','listenings'], { transacting: trx })

    await Promise.mapSeries(req.resource.related('audit').map(audit => audit), async audit => {

      await audit.destroy({ transacting: trx })

    })

    await Promise.mapSeries(req.resource.related('comments').map(comment => comment), async comment => {

      await comment.destroy({ transacting: trx })

    })

    await Promise.mapSeries(req.resource.related('listenings').map(listener => listener), async listener => {

      await listener.destroy({ transacting: trx })

    })

  }

  const listeners = async (req, trx, result, options) => {

    if(!result.get('project_id')) return [result.get('user_id')]

    const listeners = await Member.query(qb => {

      qb.where({ project_id: result.get('project_id') })

      qb.whereRaw('(member_type_id != ? OR user_id = ?)', [3, result.get('user_id')])

    }).fetchAll({ transacting: trx })

    return listeners.map(listener => listener.get('user_id'))

  }

  const channels = (req, trx, result, options) => [
    {
      channel: `/admin/users/${result.get('user_id')}`,
      target: '/admin/expenses/items'
    }, {
      channel: 'team',
      target: [
        `/admin/expenses/${pluralize(item.name)}/${result.get('id')}`,
        '/admin/expenses/approvals',
        '/admin/expenses/reports'
      ]
    }
  ]

  const refresh = {
    create: channels,
    update: channels,
    destroy: (req, trx, result, options) => [
      {
        channel: `/admin/users/${result.get('user_id')}`,
        target: '/admin/expenses/items'
      }, {
        channel: 'team',
        target: '/admin/expenses/reports'
      }
    ]
  }

  return new Resources({
    activities,
    afterProcessor: {
      create: afterProcessor,
      update: afterProcessor
    },
    allowedParams: item.allowedParams,
    alterRequest: item.alterRequest,
    audit,
    beforeProcessor: {
      destroy: beforeProcessor
    },
    defaultParams,
    defaultQuery: item.defaultQuery,
    defaultSort: item.defaultSort,
    except: ['list'],
    filterParams: item.filterParams,
    listeners: {
      create: listeners,
      update: listeners
    },
    memberActions: [
      status(item),
      action(item, '/submit', 'submitted', 3, ['owner']),
      action(item, '/approve', 'approved', 4, ['approver']),
      action(item, '/reject', 'rejected', 5, ['approver','manager']),
      action(item, '/review', 'reviewed', 6, ['manager'])
    ],
    model: item.model,
    // need some sort of access function in here
    path: `/${pluralize(item.name)}`,
    refresh,
    rights: ['expenses:manage_expenses'],
    serializer: item.serializer,
    searchParams: item.searchParams,
    sortParams: item.sortParams,
    virtualParams: item.virtualParams,
    withRelated: [
      ...item.withRelated,
      { audit: qb => qb.orderBy('created_at', 'asc') },'audit.story','audit.user.photo'
    ]
  })

}

export default itemResources
