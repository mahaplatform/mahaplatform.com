import { notifications } from '../../../../../core/services/routes/notifications'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Plan from '../../../models/plan'
import tensify from 'tensify'
import _ from 'lodash'

const actions = [
  { action: 'approve', status: 'active', role: 'supervisor' },
  { action: 'submit', status: 'submitted', role: 'employee' },
  { action: 'reopen', status: 'active', role: 'supervisor' },
  { action: 'complete', status: 'completed', role: 'supervisor' }
]

const actionRoute = async (req, res) => {

  const action = _.find(actions, {
    action: req.params.action
  })

  if(!action) return res.status(404).respond({
    code: 403,
    message: 'Unable to load action'
  })

  const plan = await Plan.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!plan) return res.status(404).respond({
    code: 404,
    message: 'Unable to load plan'
  })

  if(req.user.get('id') !== plan.get(`${action.role}_id`)) return res.status(403).respond({
    code: 403,
    message: 'You are not allowed to perform this action'
  })

  await plan.save({
    status: action.status
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: `${tensify(action.action).past} {object}`,
    object: plan
  })

  await audit(req, {
    story: tensify(action.action).past,
    auditable: plan
  })

  await notifications(req, {
    type: 'competencies:plan_approved',
    listenable: plan,
    subject_id: req.user.get('id'),
    story: `${tensify(action.action).past} {object}`,
    object: plan
  })

  await socket.refresh(req, [
    '/admin/learning/plans',
    '/admin/learning/plans/employees',
    '/admin/learning/plans/reports',
    `/admin/learning/plans/${plan.get('id')}`
  ])

  res.status(200).respond(true)

}

export default actionRoute
