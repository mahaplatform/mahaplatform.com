import MaterialSerializer from '@apps/training/serializers/material_serializer'
import Material from '@apps/training/models/material'

const showRoute = async (req, res) => {

  const material = await Material.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('training_id', req.params.training_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['asset.source','asset.user.photo'],
    transacting: req.trx
  })

  if(!material) return res.status(404).respond({
    code: 404,
    message: 'Unable to load material'
  })

  res.status(200).respond(material, MaterialSerializer)

}

export default showRoute
