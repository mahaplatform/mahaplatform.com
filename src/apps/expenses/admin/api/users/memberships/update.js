import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import User from '../../../../../maha/models/user'
import Project from '../../../../models/project'
import moment from 'moment'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('id', req.params.user_id)
  }).fetch({
    transacting: req.trx
  })

  const members = await req.trx('expenses_members').where({
    user_id: req.params.user_id
  })

  const existing = members.map(member => ({
    member_type_id: member.member_type_id,
    project_id: member.project_id
  }))

  const add = req.body.assignments.filter(({ project_id }) => {
    return _.find(existing, { project_id }) === undefined
  })

  const remove = existing.filter(({ project_id }) => {
    return _.find(req.body.assignments, { project_id }) === undefined
  })

  const update = req.body.assignments.filter(member => {
    const membership = _.find(existing, {
      project_id: member.project_id
    })
    return membership !== undefined && membership.member_type_id !== member.member_type_id
  })

  if(add.length === 0 && remove.length === 0 && update.length === 0) {
    return res.status(200).respond(true)
  }

  if(add) {
    await req.trx('expenses_members').insert(add.map(member => ({
      team_id: req.team.get('id'),
      user_id: req.params.user_id,
      ...member,
      created_at: moment(),
      updated_at: moment()
    })))
  }

  if(remove) {
    await req.trx('expenses_members').where({
      user_id: req.params.user_id
    }).whereIn('project_id', remove.map(member => {
      return member.project_id
    })).delete()
  }

  if(update) {
    await Promise.mapSeries(update, async (member) => {
      await req.trx('expenses_members').where({
        user_id: req.params.user_id,
        project_id: member.project_id
      }).update({
        member_type_id: member.member_type_id,
        updated_at: moment()
      })
    })
  }

  await Promise.mapSeries([
    ...add,
    ...remove,
    ...update
  ], async(member) => {

    const project = await Project.query(qb => {
      qb.where('id', member.project_id)
    }).fetch({
      transacting: req.trx
    })

    await audit(req, {
      story: 'membership updated',
      auditable: project
    })

    await socket.refresh(req, [
      `/admin/expenses/projects/${member.project_id}`
    ])

  })

  await activity(req, {
    story: 'updated memberships for {object}',
    object: user
  })

  res.status(200).respond(true)

}

export default updateRoute
