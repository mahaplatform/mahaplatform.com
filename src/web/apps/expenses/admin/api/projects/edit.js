import Project from '../../../models/project'

const editRoute = async (req, res) => {

  const project = await Project.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!project) return res.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  res.status(200).respond(project, {
    fields: [
      'id',
      'title',
      'tax_project_id',
      'integration',
      'is_active'
    ]
  })

}

export default editRoute
