import ImportItem from '../../../../maha/models/import_item'
import { sendUserActivation } from '../../../services/users'
import knex from '../../../../../core/services/knex'
import User from '../../../../maha/models/user'

const finalizeRoute = async (req, res) => {

  const items = await ImportItem.where({
    import_id: req.params.id
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    await Promise.mapSeries(req.body.group_ids, async (group_id) => {
      await knex('maha_users_groups').transacting(req.trx).insert({
        group_id,
        user_id: item.get('object_id')
      })
    })

    await Promise.mapSeries(req.body.role_ids, async (role_id) => {
      await knex('maha_users_roles').transacting(req.trx).insert({
        role_id,
        user_id: item.get('object_id')
      })
    })

    await Promise.mapSeries(req.body.supervisor_ids, async (supervisor_id) => {
      await knex('maha_supervisions').transacting(req.trx).insert({
        supervisor_id,
        employee_id: item.get('object_id')
      })
    })

    const user = await User.where({
      id: item.get('object_id')
    }).fetch({
      transacting: req.trx
    })

    await sendUserActivation(req, req.trx, user)

  })

  res.status(200).respond(true)

}

export default finalizeRoute
