import { Resources } from '../../../server'
import Assignee from '../../../models/assignee'
import AssigneeSerializer from '../../../serializers/assignee_serializer'

const assigneeResources = new Resources({
  defaultSort: ['id'],
  model: Assignee,
  path: '/assignees',
  only: ['list'],
  serializer: AssigneeSerializer,
  searchParams: ['name'],
  sortParams: ['id'],
  withRelated: ['user.photo','group']
})

export default assigneeResources
