import { notifications } from '@core/services/routes/notifications'
import { activity } from '@core/services/routes/activities'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Reimbursement from '@apps/finance/models/reimbursement'
import Expense from '@apps/finance/models/expense'
import Advance from '@apps/finance/models/advance'
import Check from '@apps/finance/models/check'
import Trip from '@apps/finance/models/trip'
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

  const item = await type.model.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['project.members'],
    transacting: req.trx
  })

  if(item.get('status') === req.body.status) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  const valid = _.includes(req.rights, 'finance:manage_configuration')

  if(!valid) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  await item.save({
    status: req.body.status
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: `changed {object} to ${req.body.status}`,
    object: item
  })

  await audit(req, {
    story: `status changed to ${req.body.status}`,
    auditable: item
  })

  await notifications(req, {
    type: 'finance:item_changed',
    listenable: item,
    subject_id: req.user.get('id'),
    story: `changed {object} to ${req.body.status}`,
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

  await res.status(200).respond(true)

}

export default statusRoute
