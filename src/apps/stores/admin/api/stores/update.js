import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import StoreSerializer from '@apps/stores/serializers/store_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { updateAlias } from '@apps/maha/services/aliases'
import Store from '@apps/stores/models/store'

const updateRoute = async (req, res) => {

  const store = await Store.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['program'],
    transacting: req.trx
  })

  if(!store) return res.status(404).respond({
    code: 404,
    message: 'Unable to load store'
  })

  await store.save({
    ...whitelist(req.body, ['title','permalink','contact_config'])
  }, {
    transacting: req.trx,
    patch: true
  })

  await updateAlias(req, {
    permalink: req.body.permalink,
    src: `/stores/${req.body.permalink}`,
    destination: `/stores/stores/${store.get('code')}`
  })

  await audit(req, {
    story: 'created',
    auditable: store
  })

  await activity(req, {
    story: 'created {object}',
    object: store
  })

  await socket.refresh(req, [
    '/admin/stores/stores',
    `/admin/stores/stores/${store.get('id')}`
  ])

  res.status(200).respond(store, StoreSerializer)

}

export default updateRoute
