import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'
import complete from './complete'
import { Resources } from '../../../../../core/backframe'
import approve from './approve'
import report from './report'
import items from './items'

const defaultParams = (req, trx, options) => ({
  employee_id: req.user.get('id'),
  status: 'pending'
})

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
  collectionActions: [
    items,
    report
  ],
  defaultParams,
  defaultSort: ['created_at'],
  memberActions: [
    approve,
    complete
  ],
  model: Plan,
  notification,
  only: ['show','create','update'],
  path: '/plans',
  refresh,
  serializer: PlanSerializer,
  sortParams: ['created_at'],
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default planResources
