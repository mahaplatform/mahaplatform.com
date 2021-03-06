import ItemSerializer from '@apps/drive/serializers/item_serializer'
import Folder from '@apps/drive/models/folder'
import Item from '@apps/drive/models/item'

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

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.select('drive_items.*','drive_access_types.text as access_type')
      qb.joinRaw('inner join drive_items_access on drive_items_access.code=drive_items.code and drive_items_access.user_id=?', req.user.get('id'))
      qb.innerJoin('drive_access_types', 'drive_access_types.id', 'drive_items_access.access_type_id')
      qb.where('drive_items.team_id', req.team.get('id'))
      qb.whereRaw('drive_items.type != ?', ['metafile'])
      qb.whereNull('drive_items.deleted_at')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['code','folder_id','type','access_type'],
      search: ['label'],
      virtuals: {
        access_type: (qb, filter) => {
          if(!filter.$in) return
          qb.whereIn('drive_access_types.text', filter.$in)
        }
      }
    },
    sort: {
      params: req.query.$sort,
      defaults: 'label'
    },
    page: req.query.$page,
    withRelated: ['asset','accesses.access_type','accesses.user.photo','accesses.group','accesses.grouping','folder'],
    transacting: req.trx
  })

  req.starred = await req.trx('drive_starred').where({
    starrer_id: req.user.get('id')
  }).then(stars => stars.map(star => {
    return star.code
  }))

  await res.status(200).respond(items, ItemSerializer)

}

export default listRoute
