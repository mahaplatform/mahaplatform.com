import { createAsset, updateAsset } from '../../../../maha/services/asset'
import knex from '../../../../../core/services/knex'
import { createFile } from '../../../services/files'
import Folder from '../../../models/folder'

const route = async (req, res) => {

  if(req.if_token !== null && req.item && req.item.get('lock_token') !== req.if_token) {
    return res.status(403).send(null)
  }

  if(!req.item) {

    const requestURI = req.originalUrl.replace('/admin/drive/maha', '')
    const slashfree = requestURI.replace(/\/+$/, '').replace(/^\/+/, '')
    const parent_path = decodeURI(slashfree).split('/')
    const label = parent_path.slice(-1)[0]

    const folder = await Folder.where(qb => {
      qb.where('fullpath', parent_path.slice(0,-1).join('/'))
    }).fetch({
      transacting: req.trx
    })

    if(folder) {

      const access = await knex('drive_items_access').transacting(req.trx).where('code', folder.get('code')).where('user_id', req.user.get('id'))

      if(access.length === 0 || access[0].access_type_id === 3) return res.status(403).send(null)

    }

    const asset = await createAsset({
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      content_type: label[0] === '.' ? 'application/octet-stream': null,
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null,
      file_name: label
    }, req.trx)

    await createFile(req, {
      asset_id: asset.get('id'),
      folder_id: folder ? folder.get('id') : null
    })

    console.log('CREATE-FILE', req.rawBody.length, asset.get('file_size'), asset.get('key'))

  } else {

    await updateAsset(req, req.item.related('asset'), {
      file_data: req.rawBody.length === 0 ? null : req.rawBody,
      file_size: req.rawBody.length === 0 ? 0 : null
    })

    console.log('UPDATE-FILE', req.item.related('asset').get('file_size'), req.item.related('asset').get('key'))

  }

  res.status(200).send(null)

}

export default route
