import { Route } from 'maha'
import Plan from '../../../models/plan'

const activity = (req, trx, object, options) => ({
  story: 'completed {object}',
  object
})

const notification = async (req, trx, object, options) => ({
  type: 'competencies:plan_completed',
  recipient_ids: [object.get('user_id')],
  subject_id: object.get('approved_by_id'),
  story: 'completed {object}',
  object
})

const processor = async (req, trx, options) => {

  const plan = await Plan.where({
    id: req.params.id
  }).fetch({ withRelated: ['employee'], transacting: trx })

  await plan.save({
    status: 'complete'
  }, { patch: true, transacting: trx  })

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

const approveRoute = new Route({
  activity,
  method: 'patch',
  notification,
  path: '/complete',
  processor,
  refresh
})

export default approveRoute
