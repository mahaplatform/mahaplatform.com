import ProjectSerializer from '@apps/finance/serializers/project_serializer'
import Project from '@apps/finance/models/project'

const taxRoute = async (req, res) => {

  const projects = await Project.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('type', 'tax')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default taxRoute
