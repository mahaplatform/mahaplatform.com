import { Audit, Story, Route, Import, ImportItem, ImportSerializer, socket, processValues } from 'maha'
import Item from '../../../models/item'
import moment from 'moment'
import _ from 'lodash'

const processor = async (req, trx, options) => {

  const imp = await Import.where({
    id: req.body.import_id
  }).fetch({
    transacting: trx
  })

  const importItems = await ImportItem.where({
    import_id: req.body.import_id
  }).fetchAll({
    transacting: trx
  })

  await Promise.mapSeries(importItems.toArray(), async (importItem, index) => {

    const item = await Item.where({
      id: importItem.get('object_id')
    }).fetch({
      transacting: trx
    })

    const values = await processValues('sites_types', req.body.type_id, item.get('preimport'))

    await item.save({values}, {
      transacting: trx
    })

  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, null, imp)
  })

  await socket.in(`/admin/users/${imp.get('user_id')}`).emit('message', {
    target: '/admin/sites/items',
    action: 'refresh'
  })

  return {}

}


const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}


const finalizeRoute = new Route({
  method: 'patch',
  path: '/finalize',
  processor
})

export default finalizeRoute
