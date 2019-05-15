import ItemSerializer from '../../../serializers/item_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'

const moveRoute = async (req, res) => {

  const item = await Item.where({
    code: req.params.code
  }).fetch({
    transacting: req.trx
  })

  if(item.get('type') === 'folder') {

    const element = await Folder.where({
      id: item.get('item_id')
    }).fetch({
      transacting: req.trx
    })

    await element.save({
      parent_id: req.body.folder_id
    }, {
      patch: true,
      transacting: req.trx
    })

  } else {

    const element = await File.where({
      id: item.get('item_id')
    }).fetch({
      transacting: req.trx
    })

    await element.save({
      folder_id: req.body.folder_id
    }, {
      patch: true,
      transacting: req.trx
    })

  }

  await socket.refresh(req, [
    `/admin/drive/folders/${item.get('folder_id') || 'drive'}`,
    `/admin/drive/folders/${req.body.folder_id || 'drive'}`
  ])

  res.status(200).respond(item, (item) => {
    return ItemSerializer(req, req.trx, item)
  })

}

export default moveRoute
