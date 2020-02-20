import AssigneeSerializer from '../../../serializers/assignee_serializer'
import Assignee from '../../../models/assignee'

const listRoute = async (req, res) => {

  const assignees = await Assignee.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    searchParams: ['name']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignees, AssigneeSerializer)

}

export default listRoute
