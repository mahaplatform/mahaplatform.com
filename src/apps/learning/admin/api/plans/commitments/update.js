import { audit } from '../../../../../../web/core/services/routes/audit'
import socket from '../../../../../../web/core/services/routes/emitter'
import Commitment from '../../../../models/commitment'
import Plan from '../../../../models/plan'

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

  await req.trx('competencies_commitments').where({
    plan_id: req.params.plan_id
  }).delete()

  await Promise.map(req.body.commitments, async commitment => {
    await Commitment.forge({
      team_id: req.team.get('id'),
      plan_id: req.params.plan_id,
      resource_id: commitment.resource_id,
      description: commitment.description,
      is_complete: false
    }).save(null, {
      transacting: req.trx
    })
  })

  await audit(req, {
    story: 'commitments updated',
    auditable: plan
  })

  await socket.refresh(req, [
    '/admin/learning/plans',
    '/admin/learning/plans/employees',
    '/admin/learning/plans/reports',
    `/admin/learning/plans/${req.params.plan_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
