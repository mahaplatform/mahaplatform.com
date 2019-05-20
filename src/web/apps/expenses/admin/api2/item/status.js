import { notifications } from '../../../../../core/services/routes/notifications'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import Expense from '../../../models/expense'
import Advance from '../../../models/advance'
import Status from '../../../models/status'
import Trip from '../../../models/trip'
import _ from 'lodash'

const types = [
  { text: 'expenses', model: Expense },
  { text: 'advance', model: Advance },
  { text: 'reimbursement', model: Reimbursement },
  { text: 'trips', model: Trip }
]

const statusRoute = async (req, res) => {

  const type = _.find(types, {
    text: req.params.type
  })

  const resource = await type.model.where({
    id: req.params.id
  }).fetch({
    withRelated: ['project.members','listenings'],
    transacting: req.trx
  })

  if(resource.get('status_id') === req.body.status_id) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const valid = _.includes(req.rights, 'expenses:manage_configuration')

  if(!valid) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  req.status = await Status.where({
    id: req.body.status_id
  }).fetch({
    transacting: req.trx
  })

  await resource.save({
    status_id: req.body.status_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: `reverted {object} to ${resource.status.get('text')}`,
    object: resource
  })

  await audit(req, {
    story: `status reverted to ${req.status.get('text')}`,
    auditable: resource
  })

  await listeners(req, {
    user_id: req.user.get('id'),
    listenable: resource
  })

  await notifications(req, {
    type: 'expenses:item_reverted',
    recipient_ids: resource.related('listenings').filter(listener => {
      listener.get('user_id') !== req.user.get('id')
    }).map(listener => {
      listener.get('user_id')
    }),
    subject_id: req.user.get('id'),
    story: `reverted {object} to ${req.status.get('text')}`,
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

export default statusRoute
