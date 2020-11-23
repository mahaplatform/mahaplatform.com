import ResourceSerializer from '@apps/learning/serializers/resource_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Resource from '@apps/learning/models/resource'

const updateRoute = async (req, res) => {

  const resource = await Resource.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!resource) return res.status(404).respond({
    code: 404,
    message: 'Unable to load resource'
  })

  await resource.save({
    ...whitelist(req.body, ['title','description','url','asset_id'])
  }, {
    transacting: req.trx
  })

  await resource.load(['asset.user.photo','asset'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: resource
  })

  await socket.refresh(req, [
    '/admin/learning/resources',
    `/admin/learning/resources/${resource.get('id')}`
  ])

  res.status(200).respond(resource, ResourceSerializer)

}

export default updateRoute
