import socket from '@core/services/routes/emitter'
import Item from '@apps/sites/models/item'

const publishAllRoute = async (req, res) => {

  const ids = await Item.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.body.filter
    },
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
