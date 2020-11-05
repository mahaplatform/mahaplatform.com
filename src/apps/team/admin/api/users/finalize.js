import generateCode from '@core/utils/generate_code'
import ImportItem from '@apps/maha/models/import_item'
import { sendActivation } from '../../../services/users'
import User from '@apps/maha/models/user'

const finalizeRoute = async (req, res) => {

  const items = await ImportItem.where({
    import_id: req.params.id
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.mapSeries(items, async (item) => {

    if(req.body.group_ids) {
      await Promise.mapSeries(req.body.group_ids, async (group_id) => {
        await req.trx('maha_users_groups').insert({
          group_id,
          user_id: item.get('object_id')
        })
      })
    }

    if(req.body.role_ids) {
      await Promise.mapSeries(req.body.role_ids, async (role_id) => {
        await req.trx('maha_users_roles').insert({
          role_id,
          user_id: item.get('object_id')
        })
      })
    }

    if(req.body.supervisor_ids) {
      await Promise.mapSeries(req.body.supervisor_ids, async (supervisor_id) => {
        await req.trx('maha_supervisions').insert({
          supervisor_id,
          employee_id: item.get('object_id')
        })
      })
    }

    const user = await User.where({
      id: item.get('object_id')
    }).fetch({
      transacting: req.trx
    })

    const key = await generateCode(req, {
      table: 'maha_users',
      key: 'key',
      length: 32
    })

    await user.save({
      is_active: true,
      key
    }, {
      transacting: req.trx
    })

    if(!item.get('is_merged')) {
      await sendActivation(req, {
        user
      })
    }

  })

  res.status(200).respond(true)

}

export default finalizeRoute
