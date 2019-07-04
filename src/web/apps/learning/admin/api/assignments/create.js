import { whitelist } from '../../../../../core/services/routes/params'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Assignment from '../../../models/assignment'
import Training from '../../../models/training'
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

  const training = await Training.query(qb => {
    qb.where('id', req.body.training_id)
  }).fetch({
    transacting: req.trx
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
      assigned_by_id: req.user.get('id'),
      employee_id: user_id,
      is_complete: false,
      ...whitelist(req.body, ['training_id'])
    }).save(null, {
      transacting: req.trx
    })
  })

  await activity(req, {
    story: 'assigned {object}',
    object: training
  })

  await socket.refresh(req, [
    '/admin/learning/assignments'
  ])

  res.status(200).respond(true)

}

export default createRoute
