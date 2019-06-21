import { deleteAsset } from '../../maha/services/asset'
import knex from '../../../core/services/knex'
import Version from '../models/version'
import Folder from '../models/folder'
import Item from '../models/item'
import moment from 'moment'

export const moveToTrash = async (req, item) => {
  await _toggleDeletedAt(req, item, moment())
  const dotFile = await _getDotFile(req, item)
  if(!dotFile) return
  await _toggleDeletedAt(req, dotFile, moment())
}

export const restoreFromTrash = async (req, item) => {
  await _toggleDeletedAt(req, item, null)
  const dotFile = await _getDotFile(req, item)
  if(!dotFile) return
  await _toggleDeletedAt(req, dotFile, null)
}

const _toggleDeletedAt = async (req, item, deleted_at) => {

  if(item.get('type') === 'file') {
    return await knex('drive_files').transacting(req.trx).where({
      id: item.get('item_id')
    }).update({
      deleted_at
    })
  }

  await knex('drive_folders').transacting(req.trx).where({
    id: item.get('item_id')
  }).update({
    deleted_at
  })

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.map(items.toArray(), async (item) => {
    await _toggleDeletedAt(req, item, deleted_at)
  })

}

export const deleteForever = async (req, item) => {

  if(item.get('type') === 'file') {

    await knex('drive_files').transacting(req.trx).where({
      id: item.get('item_id')
    }).update({
      version_id: null
    })

    const versions = await Version.where({
      file_id: item.get('item_id')
    }).fetchAll({
      withRelated: ['asset'],
      transacting: req.trx
    }).then(versions => versions.toArray())

    await Promise.map(versions, async (version) => {

      await version.destroy({
        transacting: req.trx
      })

      await deleteAsset(version.related('asset'), req.trx)

    })

    return await knex('drive_files').transacting(req.trx).where({
      id: item.get('item_id')
    }).delete()

  }

  const items = await Item.where({
    folder_id: item.get('item_id')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.map(items.toArray(), async (item) => {
    await deleteForever(req, item)
  })

  await knex('drive_folders').transacting(req.trx).where({
    id: item.get('item_id')
  }).delete()

}

export const propagateAccess = async (req, folder) => {

  const access = await knex('drive_access').transacting(req.trx).where({
    code: folder.get('code')
  })

  const items = await knex('drive_items').transacting(req.trx).where({
    folder_id: folder.get('id')
  })

  await Promise.mapSeries(items, async item => {

    await knex('drive_access').transacting(req.trx).where({
      code: item.code
    }).delete()

    await knex('drive_access').transacting(req.trx).insert(access.map(access => ({
      team_id: access.team_id,
      code: item.code,
      group_id: access.group_id,
      user_id: access.user_id,
      is_everyone: access.is_everyone,
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
