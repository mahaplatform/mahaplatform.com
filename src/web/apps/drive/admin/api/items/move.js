import socket from '../../../../../core/services/routes/emitter'
import Folder from '../../../models/folder'
import File from '../../../models/file'
import Item from '../../../models/item'

const models = {
  file: { model: File, foreign_key: 'folder_id' },
  folder: { model: Folder, foreign_key: 'parent_id' }
}

const moveRoute = async (req, res) => {

  const folder = await Folder.where({
    id: req.body.folder_id
  }).fetch({
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.codes, async (code) => {

    const item = await Item.where({
      code
    }).fetch({
      withRelated: ['folder'],
      transacting: req.trx
    })

    const model = models[item.get('type')]

    const element = await model.model.where({
      id: item.get('item_id')
    }).fetch({
      transacting: req.trx
    })

    await element.save({
      [model.foreign_key]: req.body.folder_id
    }, {
      patch: true,
      transacting: req.trx
    })

    await socket.refresh(req, [
      `/admin/drive/folders/${item.related('folder').get('code') || 'drive'}`
    ])

  })

  await socket.refresh(req, [
    `/admin/drive/folders/${folder.get('code') || 'drive'}`
  ])

  res.status(200).respond(true)

}

export default moveRoute
