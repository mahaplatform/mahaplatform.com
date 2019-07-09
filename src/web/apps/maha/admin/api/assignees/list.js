import AssigneeSerializer from '../../../serializers/assignee_serializer'
import Assignee from '../../../models/assignee'

const listRoute = async (req, res) => {

  const assignees = await Assignee.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignees, AssigneeSerializer)

}

export default listRoute
