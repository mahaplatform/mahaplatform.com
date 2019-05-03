import { Resources } from '../../../../../core/backframe'
import Supervisor from '../../../../maha/models/supervisor'
import SupervisorSerializer from '../../../serializers/supervisor_serializer'

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

  qb.innerJoin('maha_users', 'maha_users.id', 'maha_supervisors.user_id')

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/team/supervisors'
  ],
  update: (req, trx, result, options) => [
    '/admin/team/supervisors',
    `/admin/team/supervisors/${result.get('id')}`
  ]
}

const supervisorResources = new Resources({
  allowedParams: ['user_id'],
  activities,
  defaultQuery,
  defaultSort: ['maha_users.last_name'],
  filterParams: ['user_id'],
  model: Supervisor,
  name: 'supervisor',
  only: ['list','show','create'],
  path: '/supervisors',
  refresh,
  searchParams: ['maha_users.last_name'],
  serializer: SupervisorSerializer,
  sortParams: ['maha_users.last_name'],
  withRelated: ['user.photo']
})

export default supervisorResources
