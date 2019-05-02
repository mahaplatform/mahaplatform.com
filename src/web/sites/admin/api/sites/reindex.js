import { addIndex } from '../../../services/search'
import { Field, Route  } from 'maha'
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

  const items = await Item.fetchAll({
    transacting: trx
  }).then(result => result.toArray())

  await Promise.mapSeries(items, async(item) => {
    await addIndex(item, map, trx)
  })

  return true

}

const createRoute = new Route({
  method: 'patch',
  path: '/reindex',
  processor
})

export default createRoute
