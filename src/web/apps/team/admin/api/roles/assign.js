import { Route } from '../../../../../core/backframe'
import _ from 'lodash'

const alterRequest = async (req, trx, options) => {

  const assignments = await options.knex('maha_users_roles').transacting(trx).where({ role_id: req.params.role_id })

  req.old_assignment_ids = assignments.map(assignment => assignment.user_id)

  return req

}

const processor = async (req, trx, options) => {

  const role_id = req.params.role_id

  await options.knex('maha_users_roles').transacting(trx).where({ role_id }).del()

  await Promise.map(req.body.user_ids, async (user_id) => {

    await options.knex('maha_users_roles').transacting(trx).insert({ role_id, user_id })

  })

  return true

}

const messages = (req, trx, result, options) => {

  const update_ids = _.union(req.old_assignment_ids, req.body.user_ids)

  return update_ids.map(user_id => ({
    channel: `/admin/users/${user_id}`,
    action: 'session'
  }))

}

const rules = {
  user_ids: 'required'
}

const assignRoute = new Route({
  action: 'assign',
  alterRequest,
  messages,
  method: 'patch',
  path: '',
  processor,
  rules
})

export default assignRoute
