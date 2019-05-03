import MemberSerializer from '../../../serializers/member_serializer'
import Member from '../../../models/member'
import { Resources } from '../../../../../core/backframe'
import assign from './assign'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_users','maha_users.id','expenses_members.user_id')

  qb.innerJoin('expenses_projects','expenses_projects.id','expenses_members.project_id')

  qb.where({ project_id: req.params.project_id })

}

const projectMembershipsResources = new Resources({
  collectionActions: [ assign ],
  defaultQuery,
  defaultSort: ['expenses_projects.integration->>\'project_code\'', 'expenses_projects.title'],
  model: Member,
  only: 'list',
  path: '/projects/:project_id/memberships',
  serializer: MemberSerializer,
  withRelated: ['user.photo','project']
})

export default projectMembershipsResources
