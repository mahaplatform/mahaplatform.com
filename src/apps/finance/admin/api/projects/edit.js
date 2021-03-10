import Project from '@apps/finance/models/project'

const editRoute = async (req, res) => {

  const project = await Project.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!project) return res.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  await res.status(200).respond(project, {
    fields: [
      'id',
      'title',
      'type',
      'tax_project_id',
      'integration',
      'is_active'
    ]
  })

}

export default editRoute
