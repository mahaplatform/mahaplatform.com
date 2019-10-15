import ImportSerializer from '../../../../serializers/import_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import ImportItem from '../../../../models/import_item'

const omitRoute = async (req, res) => {

  const item = await ImportItem.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['import.asset','import.user.photo'],
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

  const _import = item.related('import')

  await item.related('import').save({
    omit_count: (_import.get('omit_count') + 1),
    error_count: (_import.get('error_count') - 1)
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.id}`
  ])

  res.status(200).respond(_import, ImportSerializer)

}

export default omitRoute
