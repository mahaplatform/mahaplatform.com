import ImportSerializer from '../../../serializers/import_serializer'
import ImportProcessQueue from '../../../queues/import_process_queue'
import socket from '../../../../../web/core/services/routes/emitter'
import Import from '../../../models/import'

const processRoute = async (req, res) => {

  const _import = await Import.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  ImportProcessQueue.enqueue(req, {
    id: _import.get('id'),
    destination: req.body.destination,
    defaultParams: req.body.defaultParams,
    table: req.body.table,
    primaryKey: req.body.primaryKey
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.id}`
  ])

  res.status(200).respond(_import, ImportSerializer)

}

export default processRoute
