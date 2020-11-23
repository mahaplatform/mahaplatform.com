import ItemSerializer from '@apps/drive/serializers/item_serializer'
import Starred from '@apps/drive/models/starred'

const starredRoute = async (req, res) => {

  const items = await Starred.filterFetch({
    scope: (qb) => {
      qb.select('drive_starred.*','drive_access_types.text as access_type')
      qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_starred.code')
      qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
      qb.where('drive_items_access.user_id', req.user.get('id'))
      qb.where('starrer_id', req.user.get('id'))
      qb.whereNull('drive_starred.deleted_at')
      qb.where('team_id', req.team.get('id'))
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

  req.starred = items.map(star => star.get('code'))

  res.status(200).respond(items, ItemSerializer)

}

export default starredRoute
