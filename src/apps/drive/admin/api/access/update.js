import { Route, knex } from 'maha'
import _ from 'lodash'

const updateAccess = async (accesses, item, trx) => {

  const current = await knex('drive_access').transacting(trx).where({
    code: item.code
  })

  await Promise.map(accesses, async access => {

    const existing = _.find(current, {
      is_everyone: access.is_everyone,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(!existing && access.access_type_id !== null) {

      await knex('drive_access').transacting(trx).insert({
        team_id: item.team_id,
        code: item.code,
        is_everyone: access.is_everyone,
        group_id: access.group_id,
        user_id: access.user_id,
        access_type_id: access.access_type_id
      })

    } else if(existing && access.access_type_id === null) {

      await knex('drive_access').transacting(trx).where({
        id: existing.id
      }).delete()

    } else if(existing && existing.access_type_id !== access.access_type_id) {

      await knex('drive_access').transacting(trx).where({
        id: existing.id
      }).update({
        access_type_id: access.access_type_id
      })

    }

  })

  if(item.type !== 'folder') return

  const items = await knex('drive_items').transacting(trx).where({
    folder_id: item.item_id
  })

  await Promise.map(items, async item => {

    await updateAccess(accesses, item, trx)

  })

}

const processor = async (req, trx, options) => {

  req.item = await knex('drive_items').where({
    code: req.params.code
  })

  await updateAccess(req.body.access, req.item[0], trx)

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/drive/folders/${req.item.folder_id || 'drive'}`,
  `/admin/drive/folders/${req.params.id}`
]

const assignRoute = new Route({
  method: 'patch',
  path: '/access',
  processor,
  refresh
})

export default assignRoute
