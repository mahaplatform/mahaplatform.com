import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import knex from '../../../../../../core/services/knex'
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

  await knex('competencies_commitments').transacting(req.trx).where({
    plan_id: req.params.plan_id
  }).delete()

  await Promise.map(req.body.ids, async id => {
    await Commitment.forge({
      team_id: req.team.get('id'),
      plan_id: req.params.plan_id,
      resource_id: id,
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
    '/admin/competencies/plans',
    '/admin/competencies/plans/reports',
    `/admin/competencies/plans/${req.params.plan_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
