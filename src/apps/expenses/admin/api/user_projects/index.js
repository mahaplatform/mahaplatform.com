import { Resources } from 'maha'
import Project from '../../../models/project'
import MembershipSerializer from '../../../serializers/membership_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select('expenses_projects.*', 'expenses_member_types.name as member_type')

  qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.params.user_id, true])

  qb.joinRaw('inner join expenses_member_types on expenses_member_types.id=expenses_members.member_type_id')

  qb.where('expenses_projects.is_active', true)

}

const userProjectResources = new Resources({
  defaultQuery,
  defaultSort: ['integration->>\'project_code\'','expenses_projects.title'],
  model: Project,
  only: 'list',
  path: '/users/:user_id/projects',
  serializer: MembershipSerializer,
  searchParams: ['expenses_projects.title','integration->>\'project_code\''],
  sortParams: ['created_at']
})

export default userProjectResources
