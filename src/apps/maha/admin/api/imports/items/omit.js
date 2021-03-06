import ImportSerializer from '@apps/maha/serializers/import_serializer'
import socket from '@core/services/routes/emitter'
import ImportItem from '@apps/maha/models/import_item'
import Import from '@apps/maha/models/import'

const omitRoute = async (req, res) => {

  const item = await ImportItem.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import item'
  })

  await item.save({
    is_omitted: true
  }, {
    patch: true,
    transacting: req.trx
  })

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('maha_imports.id', item.get('import_id'))
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.get('id')}`
  ])

  await res.status(200).respond(_import, ImportSerializer)

}

export default omitRoute
