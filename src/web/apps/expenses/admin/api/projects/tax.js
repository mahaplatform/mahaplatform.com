import ProjectSerializer from '../../../serializers/project_serializer'
import Project from '../../../models/project'

const taxRoute = async (req, res) => {

  const projects = await Project.scope({
    team: req.team
  }).query(qb => {
    qb.joinRaw('inner join expenses_projects parent on parent.tax_project_id=expenses_projects.id')
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(projects, ProjectSerializer)

}

export default taxRoute
