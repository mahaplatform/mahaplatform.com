import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import ImportSerializer from '@apps/maha/serializers/import_serializer'
import socket from '@core/services/routes/emitter'
import Import from '@apps/maha/models/import'

const updateRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  await _import.save({
    ...whitelist(req.body, ['stage','delimiter','headers','mapping','name','strategy']),
    config: {
      ..._import.get('config') || {},
      ...req.body.config || {}
    }
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.get('id')}`
  ])

  const imp = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','program','user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(imp, ImportSerializer)

}

export default updateRoute
