import { notifications } from '../../../../../core/services/routes/notifications'
import { listeners } from '../../../../../core/services/routes/listeners'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import PlanSerializer from '../../../serializers/plan_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Plan from '../../../models/plan'

const createRoute = async (req, res) => {

  const plan = await Plan.forge({
    team_id: req.team.get('id'),
    employee_id: req.user.get('id'),
    status: 'pending',
    remind_me_4_weeks: req.body.reminders.remind_me_4_weeks,
    remind_me_2_weeks: req.body.reminders.remind_me_2_weeks,
    remind_me_1_week: req.body.reminders.remind_me_1_week,
    ...whitelist(req.body, ['due','supervisor_id'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: plan
  })

  await audit(req, {
    story: 'created',
    auditable: plan
  })

  await listeners(req, [{
    listenable: plan,
    user_id: req.user.get('id')
  }, {
    listenable: plan,
    user_id: req.body.supervisor_id
  }])

  await notifications(req, {
    type: 'competencies:plan_created',
    listenable: plan,
    subject_id: req.user.get('id'),
    story: 'created {object}',
    object: plan
  })

  await plan.load([
    { audit: qb => qb.orderBy('created_at', 'asc') },'audit.story','audit.user.photo',
    'employee.photo','supervisor.photo','goals','commitments'
  ], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/competencies/plans',
    '/admin/competencies/plans/reports'
  ])

  res.status(200).respond(plan, PlanSerializer)

}

export default createRoute
