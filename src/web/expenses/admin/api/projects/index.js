import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'
import { Resources } from 'maha'
import disable from './disable'
import enable from './enable'
import _ from 'lodash'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultParams = (req, trx) => ({
  is_active: true,
  integration: {}
})

const defaultQuery = async (req, trx, qb, options) => {

  if(_.includes(req.rights, 'expenses:manage_configuration')) return

  qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.user.get('id'), true])

}

const memberFilter = (qb, filter, options) => {

  qb.innerJoin('expenses_members', 'expenses_members.project_id', 'expenses_projects.id')

  qb.whereIn('expenses_members.user_id', filter.$eq)

}

const refresh = {
  update: (req, trx, result, options) => [
    `/admin/expenses/projects/${result.get('id')}`
  ]
}

const projectResources = new Resources({
  activities,
  allowedParams: ['title', 'integration'],
  defaultParams,
  defaultQuery,
  defaultSort: ['integration->>\'project_code\'', 'title'],
  filterParams: ['is_active'],
  refresh,
  memberActions: [
    disable,
    enable
  ],
  model: Project,
  path: '/projects',
  searchParams: ['title','integration->>\'project_code\''],
  serializer: ProjectSerializer,
  sortParams: ['id', 'title', 'is_active', 'created_at'],
  virtualFilters: {
    user_id: memberFilter
  }
})

export default projectResources
