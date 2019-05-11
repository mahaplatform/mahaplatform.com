import AssigneeSerializer from '../../../serializers/assignee_serializer'
import Assignee from '../../../models/assignee'

const listRoute = async (req, res) => {

  const assignees = await Assignee.filter({
    filter: req.query.$filter,
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','group'],
    transacting: req.trx
  })

  const data = assignees.map(assignee => {
    return AssigneeSerializer(req, req.trx, assignee)
  })

  res.status(200).respond(data)

}

export default listRoute
