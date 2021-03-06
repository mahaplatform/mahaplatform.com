import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { deleteStore } from '@apps/stores/services/stores'
import Store from '@apps/stores/models/store'

const destroyRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  await deleteStore(req, {
    store
  })

  await activity(req, {
    story: 'deleted {object}',
    object: store
  })

  await socket.refresh(req, [
    '/admin/stores/stores',
    `/admin/stores/stores/${store.id}`
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
