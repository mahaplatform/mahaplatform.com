import ItemSerializer from '../../../serializers/item_serializer'
import Folder from '../../../models/folder'
import Item from '../../../models/item'

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

      if(!folder) return req.status(404).respond({
        code: 404,
        message: 'folder not found'
      })

      req.query.$filter.folder_id = {
        $eq: folder.get('id').toString()
      }

    }

    delete req.query.$filter.code

  }

  const items = await Item.scope({
    team: req.team
  }).query(qb => {
    qb.select('drive_items.*','drive_access_types.text as access_type')
    qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
    qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
    qb.whereRaw('drive_items.type != ?', ['metafile'])
    qb.whereNull('drive_items.deleted_at')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['code','folder_id','type','access_type'],
    searchParams: ['label'],
    virtualFilters: {
      access_type: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('drive_access_types.text', filter.$in)
      }
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'label'
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['asset.source','accesses.access_type','accesses.user.photo','accesses.group','accesses.grouping','folder'],
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
