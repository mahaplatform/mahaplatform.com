import ImportSerializer from '../../../../serializers/import_serializer'
import socket from '../../../../../../core/services/routes/emitter'
import { validate } from '../../../../../../core/utils/validation'
import ImportItem from '../../../../models/import_item'
import flat from 'flat'

const fixRoute = async (req, res) => {

  const item = await ImportItem.scope({
    team: req.team
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

  const rules = flat(req.body.rules, {
    maxDepth: 2
  })

  await validate(rules, req.body)

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

  res.status(200).respond(_import, ImportSerializer)

}

export default fixRoute
