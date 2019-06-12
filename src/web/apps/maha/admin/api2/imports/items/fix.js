import ImportSerializer from '../../../../serializers/import_serializer'
import socket from '../../../../../core/services/routes/emitter'
import ImportItem from '../../../models/import_item'
import Checkit from 'checkit'
import flat from 'flat'

const fixRoute = async (req, res) => {

  const item = await ImportItem.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['import.asset','import.user.photo'],
    transacting: req.trx
  })

  if(!item) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import item'
  })

  const rules = flat(req.body.rules, {
    maxDepth: 2
  })

  await Checkit(rules).run(req.body)

  await item.save({
    is_valid: true
  }, {
    patch: true,
    transacting: req.trx
  })

  const _import = item.related('import')

  await _import.save({
    valid_count: (_import.get('valid_count') + 1),
    error_count: (_import.get('error_count') - 1)
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.id}`
  ])

  res.status(200).respond(_import, (_import) => {
    return ImportSerializer(req, req.trx, _import)
  })

}

export default fixRoute
