import { deleteAsset } from '../../maha/services/asset'
import knex from '../../../core/services/knex'
import Version from '../models/version'
import Folder from '../models/folder'
import Item from '../models/item'
import moment from 'moment'

export const moveToTrash = async (item, trx) => {
  await _toggleDeletedAt(item, moment(), trx)
}

export const restoreFromTrash = async (item, trx) => {
  await _toggleDeletedAt(item, null, trx)
}

const _toggleDeletedAt = async (item, deleted_at, trx) => {

  if(item.get('type') === 'file') {

    return await knex('drive_files').transacting(trx).where({
      id: item.get('item_id')
    }).update({
      deleted_at
    })

  }

  await knex('drive_folders').transacting(trx).where({
    id: item.get('item_id')
  }).update({
    deleted_at
  })

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({ transacting: trx })

  await Promise.map(items.toArray(), async (item) => {

    await _toggleDeletedAt(item, deleted_at, trx)

  })

}

export const deleteForever = async (item, trx) => {

  if(item.get('type') === 'file') {

    await knex('drive_files').transacting(trx).where({
      id: item.get('item_id')
    }).update({
      version_id: null
    })

    const versions = await Version.where({
      file_id: item.get('item_id')
    }).fetchAll({
      withRelated: ['asset'],
      transacting: trx
    })

    await Promise.map(versions.toArray(), async (version) => {

      await version.destroy({ transacting: trx })

      await deleteAsset(version.related('asset'), trx)

    })

    return await knex('drive_files').transacting(trx).where({
      id: item.get('item_id')
    }).delete()

  }

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({ transacting: trx })

  await Promise.map(items.toArray(), async (item) => {

    await deleteForever(item, trx)

  })

  await knex('drive_folders').transacting(trx).where({
    id: item.get('item_id')
  }).delete()

}

export const propagateAccess = async (folder, trx) => {

  const access = await knex('drive_access').transacting(trx).where({
    code: folder.get('code')
  })

  const items = await knex('drive_items').transacting(trx).where({
    folder_id: folder.get('id')
  })

  await Promise.mapSeries(items, async item => {

    await knex('drive_access').transacting(trx).where({
      code: item.code
    }).delete()

    await knex('drive_access').transacting(trx).insert(access.map(access => ({
      team_id: access.team_id,
      code: item.code,
      group_id: access.group_id,
      user_id: access.user_id,
      is_everyone: access.is_everyone,
      access_type_id: access.access_type_id
    })))

    if(item.type === 'file') return

    const subfolder = await Folder.where({ code: item.code }).fetch({ transacting: trx })

    return await propagateAccess(subfolder, trx)

  })

}
