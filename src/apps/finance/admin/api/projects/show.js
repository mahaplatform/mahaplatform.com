import ProjectSerializer from '@apps/finance/serializers/project_serializer'
import Project from '@apps/finance/models/project'
import _ from 'lodash'

const showRoute = async (req, res) => {

  const project = await Project.query(qb => {
    qb.where('finance_projects.team_id', req.team.get('id'))
    if(!_.includes(req.rights, 'finance:manage_configuration')) {
      qb.joinRaw('inner join finance_members on finance_members.project_id=finance_projects.id and finance_members.user_id=?', [req.user.get('id')])
      qb.where('finance_projects.is_active', true)
    }
    qb.where('finance_projects.id', req.params.id)
  }).fetch({
    withRelated:['audit.story','audit.user.photo','tax_project'],
    transacting: req.trx
  })

  if(!project) return res.status(404).respond({
    code: 404,
    message: 'Unable to load project'
  })

  await res.status(200).respond(project, ProjectSerializer)

}

export default showRoute
