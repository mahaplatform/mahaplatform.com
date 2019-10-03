import User from '../../../../apps/maha/models/user'
import _ from 'lodash'

const getEveryone = async (req) => await User.query(qb => {
  qb.where('is_active', true)
}).fetchAll({
  transacting: req.trx
}).then(users => users.map(user => user.get('id')))

const getSupervisors = async (req) => await User.query(qb => {
  qb.innerJoin('maha_supervisors','maha_supervisors.user_id','maha_users.id')
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

export const getUsersIds = async (req, assignments) => {
  return await Promise.reduce(req.body.assignments, async (user_ids, assignment) => [
    ...user_ids,
    ...assignment.grouping === 'everyone' ? await getEveryone(req) : [],
    ...assignment.grouping === 'supervisors' ? await getSupervisors(req) : [],
    ...assignment.group_id ? await getGroupUsers(req, assignment.group_id) : [],
    ...assignment.user_id ? [assignment.user_id] : []
  ], []).then(user_ids => _.uniq(user_ids))
}
