import socket from '../../../web/core/services/routes/emitter'
import Version from '../models/version'
import Folder from '../models/folder'
import Item from '../models/item'
import moment from 'moment'

export const moveToTrash = async (req, item) => {
  await _toggleDeletedAt(req, item, moment())
  const dotFile = await _getDotFile(req, item)
  if(dotFile) await _toggleDeletedAt(req, dotFile, moment())
  await socket.refresh(req, [
    `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`,
    '/admin/drive/folders/trash'
  ])
}

export const restoreFromTrash = async (req, item) => {
  await _toggleDeletedAt(req, item, null)
  const dotFile = await _getDotFile(req, item)
  if(dotFile) await _toggleDeletedAt(req, dotFile, null)
  await socket.refresh(req, [
    `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`,
    '/admin/drive/folders/trash'
  ])
}

export const deleteItems = async (req, { owner_id }) => {

}

export const transferItems = async (req, { from_user_id, to_user_id, strategy }) => {

  await req.trx('drive_folders')
    .where('owner_id', from_user_id)
    .update({
      owner_id: to_user_id
    })

  await req.trx('drive_metafiles')
    .where('owner_id', from_user_id)
    .update({
      owner_id: to_user_id
    })

  await req.trx('drive_files')
    .where('owner_id', from_user_id)
    .update({
      owner_id: to_user_id
    })

  const accesses = await req.trx('drive_access')
    .where('user_id', from_user_id)
    .where('access_type_id', 1)

  const codes = accesses.map(access => access.code)

  const access_ids = accesses.map(access => access.id)

  await req.trx('drive_access').whereIn('code', codes).where({
    user_id: to_user_id
  }).delete()

  await req.trx('drive_access').whereIn('id', access_ids).update({
    user_id: to_user_id
  })

  if(strategy === 'none') return

  await req.trx('drive_access').insert(accesses.map(access => ({
    team_id: access.team_id,
    code: access.code,
    grouping: '',
    group_id: null,
    user_id: from_user_id,
    access_type_id: strategy === 'edit' ? 2 : 3
  })))

  return true

}

const _toggleDeletedAt = async (req, item, deleted_at) => {

  if(item.get('type') === 'file') {
    return await req.trx('drive_files').where({
      id: item.get('item_id')
    }).update({
      deleted_at
    })
  }

  await req.trx('drive_folders').where({
    id: item.get('item_id')
  }).update({
    deleted_at
  })

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.map(items, async (item) => {
    await _toggleDeletedAt(req, item, deleted_at)
  })

}

export const deleteForever = async (req, item) => {

  if(item.get('type') === 'file') {

    await req.trx('drive_files').where({
      id: item.get('item_id')
    }).update({
      version_id: null
    })

    const versions = await Version.where({
      file_id: item.get('item_id')
    }).fetchAll({
      transacting: req.trx
    }).then(versions => versions.toArray())

    await req.trx('drive_versions').where({
      file_id: item.get('item_id')
    }).update({
      asset_id: null
    })

    await Promise.map(versions, async (version) => {
      await version.destroy({
        transacting: req.trx
      })
    })

    return await req.trx('drive_files').where({
      id: item.get('item_id')
    }).delete()

  } else if(item.get('type') === 'metafile') {

    return await req.trx('drive_metafiles').where({
      id: item.get('item_id')
    }).delete()

  }

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  await Promise.map(items, async (item) => {
    await deleteForever(req, item)
  })

  await req.trx('drive_folders').where({
    id: item.get('item_id')
  }).delete()

}

export const propagateAccess = async (req, folder) => {

  const access = await req.trx('drive_access').where({
    code: folder.get('code')
  })

  const items = await req.trx('drive_items').where({
    folder_id: folder.get('id')
  })

  await Promise.mapSeries(items, async item => {

    await req.trx('drive_access').where({
      code: item.code
    }).delete()

    await req.trx('drive_access').insert(access.map(access => ({
      team_id: access.team_id,
      code: item.code,
      grouping: access.grouping,
      group_id: access.group_id,
      user_id: access.user_id,
      access_type_id: access.access_type_id
    })))

    if(item.type === 'file') return

    const subfolder = await Folder.where({
      code: item.code
    }).fetch({
      transacting: req.trx
    })

    return await propagateAccess(req, subfolder)

  })

}

const _getDotFile = async (req, item) => {

  return await Item.scope({
    team: req.team
  }).query(qb => {
    qb.where('folder_id', item.get('folder_id'))
    qb.where('label', `._${item.get('label')}`)
  }).fetch({
    transacting: req.trx
  })

}
