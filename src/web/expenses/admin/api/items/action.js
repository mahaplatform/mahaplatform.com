import { Route, BackframeError } from 'maha'
import _ from 'lodash'

const actionRoute = (item, path, action, status_id, roles) => {

  const activity = (req, trx, object, options) => ({
    story: `${action} {object}`,
    object
  })

  const audit = async (req, trx, result, options) => ({
    story: action,
    auditable: result
  })

  const listeners = async (req, trx, result, options) => [
    req.user.get('id')
  ]

  const notification = async (req, trx, object, options) => {

    await object.load(['listenings'], { transacting: trx })

    const filter = listener => listener.get('user_id') !== req.user.get('id')

    const recipient_ids = object.related('listenings').filter(filter).map(listener => listener.get('user_id'))

    return {
      type: `expenses:item_${action}`,
      recipient_ids,
      subject_id: req.user.get('id'),
      story: `${action} {object}`,
      object
    }

  }

  const processor = async (req, trx, options) => {

    const resource = await item.model.where({
      id: req.params.id
    }).fetch({
      withRelated: ['project.members'],
      transacting: trx
    })

    if(resource.get('status_id') === status_id) throw new BackframeError({ code: 422, message: 'You are not allowed to perform this action' })

    const valid = roles.reduce((valid, role) => {

      if(valid) return true

      if(role === 'owner' && req.user.get('id') === resource.get('user_id')) return true

      if(role === 'approver' && _.includes(resource.get('approver_ids'), req.user.get('id'))) return true

      if(role === 'manager' && _.includes(req.rights, 'expenses:manage_configuration')) return true

      return false

    }, false)

    if(!valid) throw new BackframeError({ code: 422, message: 'You are not allowed to perform this action' })

    return await resource.save({ status_id }, { patch: true, transacting: trx  })

  }

  const refresh = (req, trx, result, options) => [
    {
      channel: `/admin/users/${result.get('user_id')}`,
      target: '/admin/expenses/items'
    }, {
      channel: 'team',
      target: [
        `/admin/expenses/${item.name}s/${result.get('id')}`,
        '/admin/expenses/approvals',
        '/admin/expenses/reports'
      ]
    }
  ]

  return new Route({
    activity,
    audit,
    listeners,
    method: 'patch',
    notification,
    path,
    processor,
    refresh
  })

}

export default actionRoute
