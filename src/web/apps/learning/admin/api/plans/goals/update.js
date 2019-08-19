import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import Plan from '../../../../models/plan'
import Goal from '../../../../models/goal'

const updateRoute = async (req, res) => {

  const plan = await Plan.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.plan_id)
  }).fetch({
    transacting: req.trx
  })

  if(!plan) return res.status(404).respond({
    code: 404,
    message: 'Unable to load plan'
  })

  await req.trx('competencies_goals')
    .where('plan_id', req.params.plan_id)
    .delete()

  await Promise.map(req.body.ids, async id => {
    await Goal.forge({
      team_id: req.team.get('id'),
      plan_id: req.params.plan_id,
      competency_id: id,
      is_complete: false
    }).save(null, {
      transacting: req.trx
    })
  })

  await audit(req, {
    story: 'goals updated',
    auditable: plan
  })

  await socket.refresh(req, [
    '/admin/learning/plans',
    '/admin/learning/plans/reports',
    `/admin/learning/plans/${req.params.plan_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
