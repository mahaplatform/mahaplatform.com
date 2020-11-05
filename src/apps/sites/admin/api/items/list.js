import ItemSerializer from '@apps/sites/serializers/item_serializer'
import Field from '@apps/maha/models/field'
import Item from '@apps/sites/models/item'

const listRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('site_id', req.params.site_id)
      qb.where('type_id', req.params.type_id)
      if(req.query.$filter && req.query.$filter.q) {
        const term = `%${req.query.$filter.q.toLowerCase()}%`
        qb.whereRaw('lower(sites_items.index) like ?', term)
      }
    },
    aliases: {
      title: `values->'${req.fields[0].get('code')}'`
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      allowed: ['id','title','created_at','is_published','updated_at'],
      defaults: ['title']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
