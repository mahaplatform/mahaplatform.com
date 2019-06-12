import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'

const publishAllRoute = async (req, res) => {

  await knex('sites_items').transacting(req.trx).whereIn('id', req.body.ids).update({
    is_published: req.body.is_published
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
  ])

  res.status(200).respond(true)

}

export default publishAllRoute
