import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import PlanSerializer from '../../../serializers/plan_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Plan from '../../../models/plan'

const updateRoute = async (req, res) => {

  const plan = await Plan.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!plan) return res.status(404).respond({
    code: 404,
    message: 'Unable to load plan'
  })

  await plan.save({
    ...whitelist(req.body, ['due']),
    remind_me_4_weeks: req.body.reminders.remind_me_4_weeks,
    remind_me_2_weeks: req.body.reminders.remind_me_2_weeks,
    remind_me_1_week: req.body.reminders.remind_me_1_week
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: plan
  })

  await audit(req, {
    story: 'updated',
    auditable: plan
  })

  await socket.refresh(req, [
    '/admin/learning/plans',
    '/admin/learning/plans/employees',
    '/admin/learning/plans/reports',
    `/admin/learning/plans/${plan.get('id')}`
  ])

  await plan.load(['audit.story','audit.user.photo','employee.photo','supervisor.photo','goals','commitments'], {
    transacting: req.trx
  })

  res.status(200).respond(plan, PlanSerializer)

}

export default updateRoute
