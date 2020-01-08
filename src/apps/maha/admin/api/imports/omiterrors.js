import ImportSerializer from '../../../serializers/import_serializer'
import ImportItem from '../../../models/import_item'
import Import from '../../../models/import'

const omiterrorsRoute = async (req, res) => {

  const imp = await Import.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!imp) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  const items = await ImportItem.scope(qb => {
    qb.where('team_id', req.team.get('id'))
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

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(_import, ImportSerializer)

}

export default omiterrorsRoute
