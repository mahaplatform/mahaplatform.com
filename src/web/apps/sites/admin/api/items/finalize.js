import Field from '../../../../maha/models/field'
import { Route } from '../../../../../core/backframe'
import Import from '../../../../maha/models/import'
import ImportItem from '../../../../maha/models/import_item'
import socket from '../../../../../core/services/emitter'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import { processValues } from '../../../../maha/services/values'
import { addIndex } from '../../../services/search'
import Item from '../../../models/item'

const processor = async (req, trx, options) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: trx
  })

  const map = fields.reduce((map, field) => ({
    ...map,
    [field.get('parent_id')]: [
      ...map[field.get('parent_id')] || [],
      field
    ]
  }), {})

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

    await item.save({ values }, {
      transacting: trx
    })

    await addIndex(item, map, trx)

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

const finalizeRoute = new Route({
  method: 'patch',
  path: '/finalize',
  processor
})

export default finalizeRoute
