import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Project from '../../../models/project'
import moment from 'moment'

const mergeRoute = async (req, res) => {

  await knex('expenses_reimbursements').transacting(req.trx).where({
    project_id: req.params.id
  }).update({
    project_id: req.body.project_id
  })

  await knex('expenses_expenses').transacting(req.trx).where({
    project_id: req.params.id
  }).update({
    project_id: req.body.project_id
  })

  await knex('expenses_checks').transacting(req.trx).where({
    project_id: req.params.id
  }).update({
    project_id: req.body.project_id
  })

  await knex('expenses_trips').transacting(req.trx).where({
    project_id: req.params.id
  }).update({
    project_id: req.body.project_id
  })

  const members = await knex('expenses_members').transacting(req.trx).where({
    project_id: req.params.id
  })

  const new_members = await knex('expenses_members').transacting(req.trx).where({
    project_id: req.body.project_id
  })

  await Promise.mapSeries(members, async (member) => {
    const exisiting = new_members.find(new_member => {
      return new_member.user_id === member.user_id
    })
    if(!exisiting) {
      await knex('expenses_members').transacting(req.trx).insert({
        team_id: req.team.get('id'),
        project_id: req.body.project_id,
        user_id: member.user_id,
        member_type_id: member.member_type_id,
        is_active: true,
        created_at: moment(),
        updated_at: moment()
      })
    } else if(exisiting.member_type_id > member.member_type_id) {
      await knex('expenses_members').transacting(req.trx).where({
        team_id: req.team.get('id'),
        project_id: req.body.project_id,
        user_id: exisiting.user_id,
        member_type_id: exisiting.member_type_id,
        is_active: true,
        created_at: moment(),
        updated_at: moment()
      }).update({
        member_type_id: member.member_type_id
      })
    }
  })

  await knex('expenses_members').transacting(req.trx).where({
    project_id: req.params.id
  }).del()

  await knex('maha_audits').transacting(req.trx).where({
    auditable_type: 'expenses_projects',
    auditable_id: req.params.id
  }).del()

  await knex('expenses_projects').transacting(req.trx).where({
    id: req.params.id
  }).del()

  const project = await Project.query(qb => {
    qb.where('id', req.body.project_id)
  }).fetch({
    transacting: req.trx
  })

  await audit(req, {
    story: 'merged project',
    auditable: project
  })

  await socket.refresh(req, [
    '/admin/expenses/projects',
    `/admin/expenses/projects/${project.id}`
  ])

  res.status(200).respond(true)

}

export default mergeRoute
