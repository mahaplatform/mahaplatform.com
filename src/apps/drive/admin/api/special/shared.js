import ItemSerializer from '@apps/drive/serializers/item_serializer'
import Item from '@apps/drive/models/item'

const sharedRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.select('drive_items.*','drive_access_types.text as access_type')
      qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
      qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
      qb.whereNot('drive_access_types.text', 'owner')
      qb.where('team_id', req.team.get('id'))
      qb.whereNull('drive_items.deleted_at')
      qb.where('type', 'file')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['code','folder_id','type'],
      search: ['label']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'label'
    },
    page: req.query.$page,
    withRelated: ['asset','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  })

  req.starred = await req.trx('drive_starred').where({
    starrer_id: req.user.get('id')
  }).then(stars => stars.map(star => {
    return star.code
  }))

  await res.status(200).respond(items, ItemSerializer)

}

export default sharedRoute
