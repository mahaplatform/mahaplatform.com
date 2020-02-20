import ItemSerializer from '../../../serializers/item_serializer'
import Item from '../../../models/item'

const listRoute = async (req, res) => {

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.select('drive_items.*','drive_access_types.text as access_type')
      qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
      qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
      qb.leftJoin('drive_folders', 'drive_folders.id', 'drive_items.folder_id')
      qb.whereRaw('drive_items.deleted_at is not null and (drive_items.folder_id is null or drive_folders.deleted_at is null)')
      qb.whereRaw('drive_items.type != ?', 'metafile')
      qb.where('team_id', req.team.get('id'))
    },
    sort: {
      params: req.query.$sort,
      allowed: 'label'
    },
    page: req.query.$page,
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder'],
    transacting: req.trx
  })

  req.starred = await req.trx('drive_starred').where({
    starrer_id: req.user.get('id')
  }).then(stars => stars.map(star => {
    return star.code
  }))

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
