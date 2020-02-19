import socket from '../../../../../core/services/routes/emitter'
import Item from '../../../models/item'

const publishAllRoute = async (req, res) => {

  const ids = await Item.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.body.filter
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.map(result => {
    return result.get('id')
  }))

  await req.trx('sites_items')
    .whereIn('id',ids)
    .update('is_published', req.body.is_published)

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
  ])

  res.status(200).respond(true)

}

export default publishAllRoute
