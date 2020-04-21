import ContactImportProcessQueue from '../../../queues/contactimport_process_queue'
import ImportSerializer from '../../../../maha/serializers/import_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Import from '../../../../maha/models/import'

const processRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.select('maha_imports.*','maha_import_counts.*')
    qb.innerJoin('maha_import_counts', 'maha_import_counts.import_id', 'maha_imports.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset','user.photo'],
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  ContactImportProcessQueue.enqueue(req, {
    import_id: _import.get('id')
  })

  await socket.refresh(req, [
    `/admin/imports/${_import.id}`
  ])

  res.status(200).respond(_import, ImportSerializer)

}

export default processRoute
