import { Route } from 'maha'
import ItemSerializer from '../../../serializers/item_serializer'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'

const processor = async (req, trx, options) => {

  const item = await Item.where({ code: req.params.id }).fetch({ transacting: trx })

  req.old_folder_id = item.get('folder_id')

  if(item.get('type') === 'folder') {

    const element = await Folder.where({ id: item.get('item_id') }).fetch({ transacting: trx })

    await element.save({ parent_id: req.body.folder_id }, { patch: true, transacting: trx })

  } else {

    const element = await File.where({ id: item.get('item_id') }).fetch({ transacting: trx })

    await element.save({ folder_id: req.body.folder_id }, { patch: true, transacting: trx })

  }

  return item

}

const refresh = (req, trx, result, options) => [
  `/admin/drive/folders/${req.old_folder_id || 'drive'}`,
  `/admin/drive/folders/${req.body.folder_id || 'drive'}`
]

const moveRoute = new Route({
  method: 'patch',
  path: '/:id/move',
  processor,
  refresh,
  serializer: ItemSerializer
})

export default moveRoute
