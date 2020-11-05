import ResourceSerializer from '@apps/learning/serializers/resource_serializer'
import Resource from '@apps/learning/models/resource'

const showRoute = async (req, res) => {

  const resource = await Resource.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset'],
    transacting: req.trx
  })

  if(!resource) return res.status(404).respond({
    code: 404,
    message: 'Unable to load resource'
  })

  res.status(200).respond(resource, ResourceSerializer)

}

export default showRoute
