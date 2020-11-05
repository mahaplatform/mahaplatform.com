import ResourceSerializer from '../../../serializers/resource_serializer'
import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import Resource from '../../../models/resource'

const createRoute = async (req, res) => {

  const resource = await Resource.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['title','description','url','asset_id'])
  }).save(null, {
    transacting: req.trx
  })

  await resource.load(['asset.user.photo','asset.source'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: resource
  })

  await socket.refresh(req, [
    '/admin/learning/resources'
  ])

  res.status(200).respond(resource, ResourceSerializer)

}

export default createRoute
