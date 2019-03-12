import { Route } from 'maha'
import Plan from '../../../models/plan'

const activity = (req, trx, object, options) => ({
  story: 'approved {object}',
  object
})

const notification = (req, trx, object, options) => ({
  type: 'competencies:plan_approved',
  recipient_ids: [object.get('employee_id')],
  subject_id: object.get('supervisor_id'),
  story: 'approved {object}',
  object
})

const processor = async (req, trx, options) => {

  const plan = await Plan.where({
    id: req.params.id
  }).fetch({ withRelated: ['employee'], transacting: trx })

  await plan.save({
    status: 'active'
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
  path: '/approve',
  processor,
  refresh
})

export default approveRoute
