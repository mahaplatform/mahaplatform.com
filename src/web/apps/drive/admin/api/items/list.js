import ItemSerializer from '../../../serializers/item_serializer'
import Folder from '../../../models/folder'
import Item from '../../../models/item'
import knex from '../../../../../core/services/knex'

const listRoute = async (req, res) => {

  if(req.query.$filter && req.query.$filter.code) {

    if(req.query.$filter.code.$eq === 'drive') {

      req.query.$filter.folder_id = { $eq: 'null' }

    } else {

      const folder = await Folder.where({
        code: req.query.$filter.code.$eq
      }).fetch({
        transacting: req.trx
      })

      if(folder) req.query.$filter.folder_id = {
        $eq: folder.get('id').toString()
      }

    }

    delete req.query.$filter.code

  }

  const items = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.innerJoin('drive_items_access', 'drive_items_access.code', 'drive_items.code')
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.where('drive_items_access.user_id', req.user.get('id'))
    qb.whereNull('drive_items.deleted_at')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['code','folder_id','type'],
    searchParams: ['label'],
    virtualFilters: {
      access_type: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('drive_access_types.text', filter.$in)
      }
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'id'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','folder','locked_by'],
    transacting: req.trx
  })

  req.starred = await knex('drive_starred').transacting(req.trx).where({
    starrer_id: req.user.get('id')
  }).then(stars => stars.map(star => {
    return star.code
  }))

  res.status(200).respond(items, ItemSerializer)

}

export default listRoute
