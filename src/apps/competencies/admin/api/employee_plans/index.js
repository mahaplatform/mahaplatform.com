import { Resources } from 'maha'
import Plan from '../../../models/plan'
import PlanSerializer from '../../../serializers/plan_serializer'
import approve from './approve'
import complete from './complete'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultQuery = (req, trx, qb, options) => {

  qb.where('employee_id', req.params.employee_id)

  qb.where('supervisor_id', req.user.get('id'))

}

const defaultParams = async (req, trx, options) => ({
  supervisor_id: req.user.get('id'),
  employee_id: req.params.employee_id,
  status: 'pending'
})

const notification = {
  create: async (req, trx, object, options) => ({
    type: 'competencies:plan_created',
    recipient_ids: [object.get('employee_id')],
    subject_id: object.get('supervisor_id'),
    story: 'created {object}',
    object
  })
}

const refresh = {
  create: (req, trx, result, options) => [
    { channel: `/admin/users/${result.get('employee_id')}`, target: '/admin/competencies/plans' },
    { channel: `/admin/users/${result.get('supervisor_id')}`, target: `/admin/competencies/employees/${result.get('employee_id')}` }
  ],
  update: (req, trx, result, options) => [
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
}

const employeePlanResources = new Resources({
  activities,
  allowedParams: ['due'],
  defaultParams,
  defaultQuery,
  defaultSort: ['-due'],
  memberActions: [
    approve,
    complete
  ],
  model: Plan,
  name: 'plan',
  notification,
  path: '/employees/:employee_id/plans',
  refresh,
  serializer: PlanSerializer,
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default employeePlanResources
