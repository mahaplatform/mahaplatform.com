import AssigneeSerializer from '../../../serializers/assignee_serializer'
import Assignee from '../../../models/assignee'

const listRoute = async (req, res) => {

  const assignees = await Assignee.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      allowed: ['name','is_active'],
      params: req.query.$filter,
      search: ['name']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assignees, AssigneeSerializer)

}

export default listRoute
