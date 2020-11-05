import { notifications } from '@core/services/routes/notifications'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import PlanSerializer from '../../../serializers/plan_serializer'
import socket from '@core/services/routes/emitter'
import Plan from '../../../models/plan'

const createRoute = async (req, res) => {

  const plan = await Plan.forge({
    team_id: req.team.get('id'),
    supervisor_id: req.user.get('id'),
    status: 'pending',
    ...whitelist(req.body, ['due','employee_id'])
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

  await notifications(req, {
    type: 'competencies:plan_created',
    listenable: plan,
    subject_id: req.user.get('id'),
    story: 'created {object}',
    object: plan
  })

  await plan.load(['audit.story','audit.user.photo','employee.photo','supervisor.photo','goals','commitments'], {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/learning/plans',
    '/admin/learning/plans/employees',
    '/admin/learning/plans/reports'
  ])

  res.status(200).respond(plan, PlanSerializer)

}

export default createRoute
