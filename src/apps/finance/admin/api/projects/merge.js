import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Project from '../../../models/project'
import moment from 'moment'

const models = ['advance','check','expense','reimbursement','trip']

const mergeRoute = async (req, res) => {

  await Promise.map(models, async model => {
    await req.trx(`finance_${model}s`).where({
      project_id: req.params.id
    }).update({
      project_id: req.body.project_id
    })
  })

  const members = await req.trx('finance_members').where({
    project_id: req.params.id
  })

  const new_members = await req.trx('finance_members').where({
    project_id: req.body.project_id
  })

  await Promise.mapSeries(members, async (member) => {
    const exisiting = new_members.find(new_member => {
      return new_member.user_id === member.user_id
    })
    if(!exisiting) {
      await req.trx('finance_members').insert({
        team_id: req.team.get('id'),
        project_id: req.body.project_id,
        user_id: member.user_id,
        type: member.type,
        created_at: moment(),
        updated_at: moment()
      })
    } else if(exisiting.type === 'member' > member.type !== 'member' || exisiting.type === 'approver' > member.type === 'owner') {
      await req.trx('finance_members').where({
        team_id: req.team.get('id'),
        project_id: req.body.project_id,
        user_id: exisiting.user_id,
        type: exisiting.type,
        created_at: moment(),
        updated_at: moment()
      }).update({
        type: member.type
      })
    }
  })

  await req.trx('finance_members').where({
    project_id: req.params.id
  }).del()

  await req.trx('maha_audits').where({
    auditable_type: 'finance_projects',
    auditable_id: req.params.id
  }).del()

  await req.trx('finance_projects').where({
    id: req.params.id
  }).del()

  const project = await Project.query(qb => {
    qb.where('id', req.body.project_id)
  }).fetch({
    transacting: req.trx
  })

  await audit(req, {
    story: 'merged',
    auditable: project
  })

  await socket.refresh(req, [
    '/admin/finance/projects',
    `/admin/finance/projects/${project.id}`
  ])

  res.status(200).respond(true)

}

export default mergeRoute
