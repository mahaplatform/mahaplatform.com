import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import Project from '../../../../models/project'
import moment from 'moment'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const project = await Project.query(qb => {
    qb.where('id', req.params.project_id)
  }).fetch({
    transacting: req.trx
  })

  const members = await req.trx('expenses_members').where({
    project_id: req.params.project_id
  })

  const existing = members.map(member => ({
    member_type_id: member.member_type_id,
    user_id: member.user_id
  }))

  const add = req.body.assignments.filter(({ user_id }) => {
    return _.find(existing, { user_id }) === undefined
  })

  const remove = existing.filter(({ user_id }) => {
    return _.find(req.body.assignments, { user_id }) === undefined
  })

  const update = req.body.assignments.filter(member => {
    const membership = _.find(existing, {
      user_id: member.user_id
    })
    return membership !== undefined && membership.member_type_id !== member.member_type_id
  })

  if(add.length === 0 && remove.length === 0 && update.length === 0) {
    return res.status(200).respond(true)
  }

  if(add) {
    await req.trx('expenses_members').insert(add.map(member => ({
      team_id: req.team.get('id'),
      project_id: req.params.project_id,
      ...member,
      created_at: moment(),
      updated_at: moment()
    })))
  }

  if(remove) {
    await req.trx('expenses_members').where({
      project_id: req.params.project_id
    }).whereIn('user_id', remove.map(member => {
      return member.user_id
    })).delete()
  }

  if(update) {
    await Promise.mapSeries(update, async (member) => {
      await req.trx('expenses_members').where({
        project_id: req.params.project_id,
        user_id: member.user_id
      }).update({
        member_type_id: member.member_type_id,
        updated_at: moment()
      })
    })

  }

  await activity(req, {
    story: 'updated membership of {object}',
    object: project
  })

  await audit(req, {
    story: 'membership updated',
    auditable: project
  })

  await socket.refresh(req, [
    `/admin/expenses/projects/${req.params.project_id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
