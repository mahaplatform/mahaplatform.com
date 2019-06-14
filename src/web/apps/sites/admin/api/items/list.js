import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const listRoute = async (req, res) => {

  const items = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    const title = req.fields[0].get('code')
    const order = req.query.$sort === '-title' ? 'desc' : 'asc'
    qb.orderByRaw(`values->>'${title}' ${order}`)
    if(req.query.$filter && req.query.$filter.q) {
      const term = `%${req.query.$filter.q.toLowerCase()}%`
      qb.whereRaw('lower(sites_items.index) like ?', term)
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'created_at'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
