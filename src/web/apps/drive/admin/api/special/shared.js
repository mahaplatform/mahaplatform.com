import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'
import knex from '../../../../../core/services/knex'

const sharedRoute = async (req, res) => {

  const items = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('type', 'file')
    qb.whereNot('drive_access_types.text', 'owner')
    qb.whereNull('drive_items.deleted_at')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['code','folder_id','type'],
    searchParams: ['label']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'id'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  })

  req.starred = await knex('drive_starred').transacting(req.trx).where({
    starrer_id: req.user.get('id')
  }).then(stars => stars.map(star => {
    return star.code
  }))

  res.status(200).respond(items, ItemSerializer)

}

export default sharedRoute
