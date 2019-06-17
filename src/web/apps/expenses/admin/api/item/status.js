import { notifications } from '../../../../../core/services/routes/notifications'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import Expense from '../../../models/expense'
import Advance from '../../../models/advance'
import Check from '../../../models/check'
import Status from '../../../models/status'
import Trip from '../../../models/trip'
import _ from 'lodash'

const types = [
  { text: 'advances', model: Advance },
  { text: 'expenses', model: Expense },
  { text: 'checks', model: Check },
  { text: 'reimbursements', model: Reimbursement },
  { text: 'trips', model: Trip }
]

const statusRoute = async (req, res) => {

  const type = _.find(types, {
    text: req.params.type
  })

  if(!type) return res.status(404).respond({
    code: 404,
    message: `Unable to find type ${req.params.type}`
  })

  const item = await type.model.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['project.members','listenings'],
    transacting: req.trx
  })

  if(item.get('status_id') === req.body.status_id) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const valid = _.includes(req.rights, 'expenses:manage_configuration')

  if(!valid) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const status = await Status.query(qb => {
    qb.where('id', req.body.status_id)
  }).fetch({
    transacting: req.trx
  })

  await item.save({
    status_id: req.body.status_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: `reverted {object} to ${status.get('text')}`,
    object: item
  })

  await audit(req, {
    story: `status reverted to ${status.get('text')}`,
    auditable: item
  })

  await listeners(req, {
    user_id: req.user.get('id'),
    listenable: item
  })

  await notifications(req, {
    type: 'expenses:item_reverted',
    recipient_ids: item.related('listenings').toArray().filter(listener => {
      return listener.get('user_id') !== req.user.get('id')
    }).map(listener => listener.get('user_id')),
    subject_id: req.user.get('id'),
    story: `reverted {object} to ${status.get('text')}`,
    object: item
  })

  await socket.refresh(req,  [{
    channel: `/admin/users/${item.get('user_id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/${req.params.type}/${item.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(true)

}

export default statusRoute
