import ItemSerializer from '../../../serializers/item_serializer'
import Field from '../../../../maha/models/field'
import Item from '../../../models/item'

const listRoute = async (req, res) => {

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const items = await Item.filter({
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
      title: `values->>'${req.fields[0].get('code')}'`
    },
    filter: req.query.$filter,
    defaultSort: ['title'],
    sort: req.query.$sort,
    sortParams: ['id','title','created_at','is_published','updated_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
