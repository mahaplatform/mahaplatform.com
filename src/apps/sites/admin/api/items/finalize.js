import ImportSerializer from '../../../../maha/serializers/import_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { processValues } from '../../../../maha/services/values'
import ImportItem from '../../../../maha/models/import_item'
import Import from '../../../../maha/models/import'
import { addIndex } from '../../../services/search'
import Field from '../../../../maha/models/field'
import Item from '../../../models/item'

const finalizeRoute = async (req, res) => {

  const imp = await Import.where({
    id: req.body.import_id
  }).fetch({
    transacting: req.trx
  })

  if(!imp) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  const fields = await Field.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: req.trx
  })

  const map = fields.reduce((map, field) => ({
    ...map,
    [field.get('parent_id')]: [
      ...map[field.get('parent_id')] || [],
      field
    ]
  }), {})


  const importItems = await ImportItem.where({
    import_id: req.body.import_id
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  await Promise.mapSeries(importItems, async (importItem, index) => {

    const item = await Item.where({
      id: importItem.get('object_id')
    }).fetch({
      transacting: req.trx
    })

    const values = await processValues(req, {
      parent_type: 'sites_types',
      parent_id: req.body.type_id,
      values: item.get('preimport')
    })

    await item.save({
      values,
      is_published: true
    }, {
      transacting: req.trx
    })

    await addIndex(req, {
      item,
      map
    })

    await socket.message(req, {
      channel: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: index + 1,
        total: importItems.length
      }
    })

  })

  await socket.message(req, {
    channel: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, imp)
  })

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/sites/items'
  })

  res.status(200).respond(true)

}

export default finalizeRoute
