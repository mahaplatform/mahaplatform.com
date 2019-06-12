import ImportSerializer from '../../../serializers/import_serializer'
import ImportProcessQueue from '../../../queues/import_process_queue'
import socket from '../../../../../core/services/routes/emitter'
import Import from '../../../models/import'

const processRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return req.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  ImportProcessQueue.enqueue(req, {
    id: req.resource.get('id'),
    destination: req.body.destination,
    defaultParams: req.body.defaultParams,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.id}`
  ])

  res.status(200).respond(_import, (_import) => {
    return ImportSerializer(req, req.trx, _import)
  })

}

export default processRoute
