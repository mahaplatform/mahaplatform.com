import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'
import complete from './complete'
import { Resources } from 'maha'
import approve from './approve'

const defaultParams = (req, trx, options) => ({
  employee_id: req.user.get('id'),
  status: 'pending'
})

const defaultQuery = (req, trx, qb, options) => {

  qb.whereRaw('competencies_plans.employee_id=? or competencies_plans.supervisor_id=?', [req.user.get('id'),req.user.get('id')])

}

const notification = {
  create: (req, trx, object, options) => ({
    type: 'competencies:plan_created',
    recipient_ids: [object.get('supervisor_id')],
    subject_id: object.get('employee_id'),
    story: 'created {object}',
    object
  })
}

const refresh = {
  create: (req, trx, result, options) => [
    {
      channel: `/admin/users/${result.get('employee_id')}`,
      target: '/admin/competencies/plans'
    }, {
      channel: `/admin/users/${result.get('supervisor_id')}`,
      target: `/admin/competencies/employees/${result.get('employee_id')}`
    }
  ]
}

const planResources = new Resources({
  allowedParams: ['supervisor_id','due'],
  defaultParams,
  defaultQuery,
  defaultSort: ['created_at'],
  memberActions: [
    approve,
    complete
  ],
  model: Plan,
  notification,
  only: ['list','show','create'],
  path: '/plans',
  refresh,
  serializer: PlanSerializer,
  sortParams: ['created_at'],
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default planResources
