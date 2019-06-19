import ResourceSerializer from '../../../serializers/resource_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Resource from '../../../models/resource'

const updateRoute = async (req, res) => {

  const resource = await Resource.scope({
    team: req.team
  }).query(qb => {
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

  await resource.load(['asset.user.photo','asset.source'], {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: resource
  })

  await socket.refresh(req, [
    '/admin/competencies/resources',
    `/admin/competencies/resources/${resource.get('id')}`
  ])

  res.status(200).respond(resource, ResourceSerializer)

}

export default updateRoute
