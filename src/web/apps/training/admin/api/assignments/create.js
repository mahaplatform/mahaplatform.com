import { activity } from '../../../../../core/services/routes/activities'
import { updateRelated } from '../../../../../core/services/routes/relations'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Assignment from '../../../models/assignment'
import Assigning from '../../../models/assigning'
import Option from '../../../models/option'
import User from '../../../../maha/models/user'
import _ from 'lodash'

const getAllUsers = async (req) => await User.query(qb => {
  qb.where('is_active', true)
}).fetchAll({
  transacting: req.trx
}).then(users => users.map(user => user.get('id')))

const getGroupUsers = async (req, group_id) => await User.query(qb => {
  qb.innerJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')
  qb.where('maha_users_groups.group_id', group_id)
  qb.where('maha_users.is_active', true)
}).fetchAll({
  transacting: req.trx
}).then(users => users.map(user => user.get('id')))

const createRoute = async (req, res) => {

  const assigning = await Assigning.forge({
    team_id: req.team.get('id'),
    assigned_by_id: req.user.get('id'),
    ...whitelist(req.body, ['title','completed_by'])
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.options, async (data) => {

    const option = await Option.forge({
      team_id: req.team.get('id'),
      assigning_id: assigning.get('id')
    }).save(null, {
      transacting: req.trx
    })

    await updateRelated(req, {
      object: option,
      related: 'options',
      table: 'training_options_trainings',
      ids: data.training_ids,
      foreign_key: 'option_id',
      related_foreign_key: 'training_id'
    })

  })

  const user_ids = await Promise.reduce(req.body.assignments, async (user_ids, assignment) => [
    ...user_ids,
    ...assignment.is_everyone ? await getAllUsers(req) : [],
    ...assignment.group_id ? await getGroupUsers(req, assignment.group_id) : [],
    ...assignment.user_id ? [assignment.user_id] : []
  ], []).then(user_ids => _.uniq(user_ids))

  await Promise.mapSeries(user_ids, async (user_id) => {
    await Assignment.forge({
      team_id: req.team.get('id'),
      user_id,
      assigning_id: assigning.get('id')
    }).save(null, {
      transacting: req.trx
    })
  })

  await socket.refresh(req, [
    '/admin/training/assignments'
  ])

  res.status(200).respond(true)

}

export default createRoute
