import ImportItemSerializer from '@apps/maha/serializers/import_item_serializer'
import ImportItem from '@apps/maha/models/import_item'

const listRoute = async (req, res) => {

  const items = await ImportItem.filterFetch({
    scope: qb => {
      qb.where('import_id', req.params.import_id)
    },
    filter: {
      params: req.query.$filter,
      allowed:['is_valid','is_omitted','is_nonunique','is_duplicate']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'id',
      allowed: ['id']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ImportItemSerializer)
}

export default listRoute
