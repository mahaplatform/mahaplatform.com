import { Route, ImportItem, User  } from 'maha'
import { sendUserActivation } from '../../../services/users'

const processor = async (req, trx, options) => {

  const items = await ImportItem.where({
    import_id: req.params.id
  }).fetchAll({
    transacting: trx
  })

  await Promise.mapSeries(items.toArray(), async (item) => {

    await Promise.mapSeries(req.body.group_ids, async (group_id) => {
      await options.knex('maha_users_groups').transacting(trx).insert({ group_id, user_id: item.get('object_id') })
    })

    await Promise.mapSeries(req.body.role_ids, async (role_id) => {
      await options.knex('maha_users_roles').transacting(trx).insert({ role_id, user_id: item.get('object_id') })
    })

    await Promise.mapSeries(req.body.supervisor_ids, async (supervisor_id) => {
      await options.knex('maha_supervisions').transacting(trx).insert({ supervisor_id, employee_id: item.get('object_id') })
    })

    const user = await User.where({
      id: item.get('object_id') 
    }).fetch({
      transacting: trx
    })

    await sendUserActivation(req, trx, user)

  })

  return {}
}


const finalizeRoute = new Route({
  method: 'patch',
  path: '/import/:id/finalize',
  processor
})

export default finalizeRoute
