import { notifications } from '../../../../../core/services/routes/notifications'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import Expense from '../../../models/expense'
import Advance from '../../../models/advance'
import Trip from '../../../models/trip'
import tensify from 'tensify'
import _ from 'lodash'

const statuses = [
  { id: 3, text: 'submit', roles: ['owner'] },
  { id: 4, text: 'approve', roles: ['approver'] },
  { id: 5, text: 'reject', roles: ['approver','manager'] },
  { id: 6, text: 'review', roles: ['manager'] }
]

const types = [
  { text: 'expenses', model: Expense },
  { text: 'advance', model: Advance },
  { text: 'reimbursement', model: Reimbursement },
  { text: 'trips', model: Trip }
]

const actionRoute = async (req, res) => {

  const type = _.find(types, {
    text: req.params.type
  })

  const resource = await type.model.where({
    id: req.params.id
  }).fetch({
    withRelated: ['project.members','listenings'],
    transacting: req.trx
  })

  const status = _.find(statuses, {
    text: req.params.action
  })

  if(resource.get('status_id') === status.id) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const valid = status.roles.reduce((valid, role) => {
    if(valid) return true
    if(role === 'owner' && req.user.get('id') === resource.get('user_id')) return true
    if(role === 'approver' && _.includes(resource.get('approver_ids'), req.user.get('id'))) return true
    if(role === 'manager' && _.includes(req.rights, 'expenses:manage_configuration')) return true
    return false
  }, false)

  if(!valid) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  await resource.save({
    status_id: status.id
  }, {
    patch: true,
    transacting: req.trx
  })

  const story = tensify.past(req.params.action)

  await activity(req, {
    story: `${story} {object}`,
    object: resource
  })

  await audit(req, {
    story,
    auditable: resource
  })

  await listeners(req, {
    user_id: req.user.get('id'),
    listenable: resource
  })

  await notifications(req, {
    type: `expenses:item_${story}`,
    recipient_ids: resource.related('listenings').filter(listener => {
      listener.get('user_id') !== req.user.get('id')
    }).map(listener => {
      listener.get('user_id')
    }),
    subject_id: req.user.get('id'),
    story: `${story} {object}`,
    object: resource
  })

  await socket.refresh(req,  [{
    channel: `/admin/users/${resource.get('user_id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/${req.params.type}/${resource.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(true)

}

export default actionRoute
