import { notifications } from '../../../../../core/services/routes/notifications'
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

  const item = await type.model.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['project.members'],
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
    story: `changed {object} to ${status.get('text')}`,
    object: item
  })

  await audit(req, {
    story: `status changed to ${status.get('text')}`,
    auditable: item
  })

  await notifications(req, {
    type: 'expenses:item_changed',
    listenable: item,
    subject_id: req.user.get('id'),
    story: `changed {object} to ${status.get('text')}`,
    object: item
  })

  await socket.refresh(req, [
    `/admin/expenses/${req.params.type}/${item.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(true)

}

export default statusRoute
