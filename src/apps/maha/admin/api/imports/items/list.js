import ImportItemSerializer from '../../../../serializers/import_item_serializer'
import ImportItem from '../../../../models/import_item'

const listRoute = async (req, res) => {

  const items = await ImportItem.scope().query(qb => {
    qb.where('import_id', req.params.import_id)
  }).filter({
    filter: req.query.$filter,
    filterParams:['is_valid','is_omitted','is_nonunique','is_duplicate']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'id',
    sortParams: ['id']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, ImportItemSerializer)
}

export default listRoute
