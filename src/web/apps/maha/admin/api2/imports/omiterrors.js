import ImportSerializer from '../../../serializers/import_serializer'
import ImportItem from '../../../models/import_item'
import Import from '../../../models/import'

const omiterrorsRoute = async (req, res) => {

  const _import = await Import.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  const items = await ImportItem.scope({
    team: req.team
  }).query(qb => {
    qb.where('import_id', req.params.id)
    qb.where('is_valid', false)
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  await Promise.mapSeries(items, async (item) => {
    await item.save({
      is_omitted: true
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  await _import.save({
    error_count: 0,
    omit_count: (req.resource.get('error_count') + req.resource.get('omit_count'))
  }, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(_import, (_import) => {
    return ImportSerializer(req, req.trx, _import)
  })

}

export default omiterrorsRoute
