import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'

const taxRoute = async (req, res) => {

  const projects = await Project.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('type', 'tax')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['id']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default taxRoute
