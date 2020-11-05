import MaterialSerializer from '@apps/training/serializers/material_serializer'
import Material from '@apps/training/models/material'

const listRoute = async (req, res) => {

  const materials = await Material.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.innerJoin('training_fulfillments', 'training_fulfillments.training_id', 'training_materials.training_id')
    qb.where('training_fulfillments.id', req.params.id)
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(materials, MaterialSerializer)

}

export default listRoute
