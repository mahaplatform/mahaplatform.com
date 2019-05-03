import { BackframeError, Route } from '../../../../../core/backframe'
import Status from '../../../models/status'
import _ from 'lodash'

const statusRoute = (item) => {

  const activity = (req, trx, object, options) => ({
    story: `reverted {object} to ${req.status.get('text')}`,
    object
  })

  const audit = async (req, trx, result, options) => ({
    story: `status reverted to ${req.status.get('text')}`,
    auditable: result
  })

  const listeners = async (req, trx, result, options) => {

    return [req.user.get('id')]

  }

  const notification = async (req, trx, object, options) => {

    await object.load(['listenings'], { transacting: trx })

    const filter = listener => listener.get('user_id') !== req.user.get('id')

    const recipient_ids = object.related('listenings').filter(filter).map(listener => listener.get('user_id'))

    return {
      type: 'expenses:item_reverted',
      recipient_ids,
      subject_id: req.user.get('id'),
      story: `reverted {object} to ${req.status.get('text')}`,
      object
    }

  }

  const processor = async (req, trx, options) => {

    const resource = await item.model.where({
      id: req.params.id
    }).fetch({ withRelated: ['project.members'], transacting: trx })

    const status_id = req.body.status_id

    if(resource.get('status_id') === status_id) throw new BackframeError({ code: 422, message: 'You are not allowed to perform this action' })

    const valid = _.includes(req.rights, 'expenses:manage_configuration')

    if(!valid) throw new BackframeError({ code: 422, message: 'You are not allowed to perform this action' })

    req.status = await Status.where({
      id: status_id
    }).fetch({ transacting: trx })

    await resource.save({
      status_id
    }, { patch: true, transacting: trx  })

    return resource

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
    path: '/status',
    processor,
    refresh
  })

}

export default statusRoute
