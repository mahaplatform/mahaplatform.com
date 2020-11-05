import ImportItemSerializer from '@apps/maha/serializers/import_item_serializer'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import ImportItem from '@apps/maha/models/import_item'

const updateRoute = async (req, res) => {

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
    ...whitelist(req.body, ['values'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/imports/${item.get('import_id')}`
  ])

  res.status(200).respond(item, ImportItemSerializer)

}

export default updateRoute
