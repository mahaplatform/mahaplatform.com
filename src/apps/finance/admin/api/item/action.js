import { notifications } from '../../../../../core/services/routes/notifications'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import Expense from '../../../models/expense'
import Advance from '../../../models/advance'
import Check from '../../../models/check'
import Trip from '../../../models/trip'
import tensify from 'tensify'
import _ from 'lodash'

const statuses = [
  { text: 'submitted', action: 'submit', roles: ['owner'] },
  { text: 'approved', action: 'approve', roles: ['approver'] },
  { text: 'rejected', action: 'reject', roles: ['approver','manager'] },
  { text: 'reviewed', action: 'review', roles: ['manager'] }
]

const types = [
  { text: 'advances', model: Advance },
  { text: 'checks', model: Check },
  { text: 'expenses', model: Expense },
  { text: 'reimbursements', model: Reimbursement },
  { text: 'trips', model: Trip }
]

const actionRoute = async (req, res) => {

  const type = _.find(types, {
    text: req.params.type
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: `Unable to find type ${req.params.type}`
  })

  const item = await type.model.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['project.members'],
    transacting: req.trx
  })

  const status = _.find(statuses, {
    action: req.params.action
  })

  if(item.get('status') === status.text) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const valid = status.roles.reduce((valid, role) => {
    if(valid) return true
    if(role === 'owner' && req.user.get('id') === item.get('user_id')) return true
    if(role === 'approver' && _.includes(item.get('approver_ids'), req.user.get('id'))) return true
    if(role === 'manager' && _.includes(req.rights, 'finance:manage_configuration')) return true
    return false
  }, false)

  if(!valid) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  await item.save({
    status: status.text
  }, {
    patch: true,
    transacting: req.trx
  })

  const story = tensify(req.params.action).past

  await activity(req, {
    story: `${story} {object}`,
    object: item
  })

  await audit(req, {
    story,
    auditable: item
  })

  await notifications(req, {
    type: `expenses:item_${story}`,
    listenable: item,
    subject_id: req.user.get('id'),
    story: `${story} {object}`,
    object: item
  })

  await socket.refresh(req, [
    `/admin/finance/${req.params.type}/${item.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(true)

}

export default actionRoute
