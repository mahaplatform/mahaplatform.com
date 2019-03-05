import { Route } from 'maha'
import Plan from '../../../models/plan'
import Commitment from '../../../models/commitment'

const processor = async (req, trx, options) => {

  const conditions = {
    id: req.params.plan_id
  }

  const plan = await Plan.where(conditions).fetch({ transacting: trx })

  const plan_id = plan.get('id')

  await Commitment.where({ plan_id }).destroy({ transacting: trx })

  await Promise.map(req.body.ids, async resource_id => {

    const data = {
      team_id: req.team.get('id'),
      plan_id,
      resource_id
    }

    await Commitment.forge(data).save(null, { transacting: trx })

  })

  return plan

}

const refresh = (req, trx, result, options) => [
  {
    channel: `/admin/users/${result.get('employee_id')}`,
    target: [
      '/admin/competencies/plans',
      `/admin/competencies/plans/${result.get('id')}`
    ]
  }, {
    channel: `/admin/users/${result.get('supervisor_id')}`,
    target: [
      `/admin/competencies/employees/${result.get('employee_id')}`,
      `/admin/competencies/employees/${result.get('employee_id')}/plans/${result.get('id')}`
    ]
  }
]

const rules = {
  ids: 'required'
}

const assignRoute = new Route({
  path: '',
  method: 'patch',
  processor,
  refresh,
  rules
})

export default assignRoute
