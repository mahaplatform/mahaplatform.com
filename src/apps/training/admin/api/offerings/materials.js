import MaterialSerializer from '@apps/training/serializers/material_serializer'
import Material from '@apps/training/models/material'

const listRoute = async (req, res) => {

  const materials = await Material.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.innerJoin('training_offerings','training_offerings.training_id','training_materials.training_id')
    qb.where('training_offerings.id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['asset'],
    transacting: req.trx
  })

  res.status(200).respond(materials, MaterialSerializer)

}

export default listRoute
