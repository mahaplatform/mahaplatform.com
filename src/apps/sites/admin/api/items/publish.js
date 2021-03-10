import socket from '@core/services/routes/emitter'
import Item from '@apps/sites/models/item'

const publishRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  await item.save({
    is_published: req.body.is_published
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
  ])

  await res.status(200).respond(true)

}

export default publishRoute
