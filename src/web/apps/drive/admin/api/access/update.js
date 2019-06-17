import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import _ from 'lodash'

const updateAccess = async (req, accesses, item) => {

  const current = await knex('drive_access').transacting(req.trx).where({
    code: item.code
  })

  await Promise.map(accesses, async access => {

    const existing = _.find(current, {
      is_everyone: access.is_everyone,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(!existing && access.access_type_id !== null) {

      await knex('drive_access').transacting(req.trx).insert({
        team_id: item.team_id,
        code: item.code,
        is_everyone: access.is_everyone,
        group_id: access.group_id,
        user_id: access.user_id,
        access_type_id: access.access_type_id
      })

    } else if(existing && access.access_type_id === null) {

      await knex('drive_access').transacting(req.trx).where({
        id: existing.id
      }).delete()

    } else if(existing && existing.access_type_id !== access.access_type_id) {

      await knex('drive_access').transacting(req.trx).where({
        id: existing.id
      }).update({
        access_type_id: access.access_type_id
      })

    }

  })

  if(item.type !== 'folder') return

  const items = await knex('drive_items').transacting(req.trx).where({
    folder_id: item.item_id
  })

  await Promise.map(items, async item => {
    await updateAccess(req, accesses, item)
  })

}

const updateRoute = async (req, res) => {

  const item = await knex('drive_items').transacting(req.trx).where({
    code: req.params.code
  })

  await updateAccess(req, req.body.access, item[0])

  await socket.refresh(req, [
    `/admin/drive/folders/${item[0].folder_id || 'drive'}`,
    `/admin/drive/folders/${req.params.id}`
  ])

  res.status(200).respond(true)

}

export default updateRoute
