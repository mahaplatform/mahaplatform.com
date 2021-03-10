import { addIndex } from '@apps/sites/services/search'
import Field from '@apps/maha/models/field'
import Item from '@apps/sites/models/item'

const reindexRoute = async (req, res) => {

  const fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
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

  const items = await Item.fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  await Promise.mapSeries(items, async(item) => {
    await addIndex(req, {
      item,
      map
    })
  })

  await res.status(200).respond(true)

}

export default reindexRoute
