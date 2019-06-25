import { notifications } from '../../../../../core/services/routes/notifications'
import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Plan from '../../../models/plan'

const completeRoute = async (req, res) => {

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

  await plan.save({
    status: 'complete'
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'completed {object}',
    object: plan
  })

  await audit(req, {
    story: 'completed',
    auditable: plan
  })

  await notifications(req, {
    type: 'competencies:plan_completed',
    listenable_type: 'commitments_plans',
    listenable_id: plan.id,
    subject_id: req.user.get('id'),
    story: 'completed {object}',
    object: plan
  })

  await socket.refresh(req, [
    '/admin/competencies/plans',
    '/admin/competencies/plans/reports',
    `/admin/competencies/plans/${plan.get('id')}`
  ])

  res.status(200).respond(true)

}

export default completeRoute
