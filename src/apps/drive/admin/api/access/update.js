import socket from '@core/services/routes/emitter'
import _ from 'lodash'

const updateAccess = async (req, accesses, item) => {

  const current = await req.trx('drive_access').where({
    code: item.code
  })

  await Promise.map(accesses, async access => {

    const existing = _.find(current, {
      grouping_id: access.grouping_id,
      group_id: access.group_id,
      user_id: access.user_id
    })

    if(!existing && access.access_type_id !== null) {

      await req.trx('drive_access').insert({
        team_id: item.team_id,
        code: item.code,
        grouping_id: access.grouping_id,
        group_id: access.group_id,
        user_id: access.user_id,
        access_type_id: access.access_type_id
      })

    } else if(existing && access.access_type_id === null) {

      await req.trx('drive_access').where({
        id: existing.id
      }).delete()

    } else if(existing && existing.access_type_id !== access.access_type_id) {

      await req.trx('drive_access').where({
        id: existing.id
      }).update({
        access_type_id: access.access_type_id
      })

    }

  })

  if(item.type !== 'folder') return

  const items = await req.trx('drive_items').where({
    folder_id: item.item_id
  })

  await Promise.map(items, async item => {
    await updateAccess(req, accesses, item)
  })

}

const updateRoute = async (req, res) => {

  const item = await req.trx('drive_items').where({
    code: req.params.code
  })

  await updateAccess(req, req.body.access, item[0])

  await socket.refresh(req, [
    `/admin/drive/folders/${item[0].code || 'drive'}`
  ])

  await res.status(200).respond(true)

}

export default updateRoute
