import MaterialSerializer from '../../../serializers/material_serializer'
import Material from '../../../models/material'

const listRoute = async (req, res) => {

  const materials = await Material.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('training_offerings','training_offerings.training_id','training_materials.training_id')
    qb.where('training_offerings.id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(materials, MaterialSerializer)

}

export default listRoute
