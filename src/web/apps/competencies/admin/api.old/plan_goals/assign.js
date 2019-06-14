import { Route } from '../../../../../core/backframe'
import Plan from '../../../models/plan'
import Goal from '../../../models/goal'

const processor = async (req, trx, options) => {

  const plan = await Plan.where({
    id: req.params.plan_id
  }).fetch({
    transacting: trx
  })

  await Goal.where({
    plan_id: plan.get('id')
  }).destroy({
    transacting: trx
  })

  await Promise.map(req.body.ids, async competency_id => {

    await Goal.forge({
      team_id: req.team.get('id'),
      plan_id: plan.get('id'),
      competency_id
    }).save(null, {
      transacting: trx
    })

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
