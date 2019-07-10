import MaterialSerializer from '../../../../serializers/material_serializer'
import Material from '../../../../models/material'

const listRoute = async (req, res) => {

  const materials = await Material.scope({
    team: req.team
  }).query(qb => {
    qb.innerJoin('learning_assignments', 'learning_assignments.training_id', 'learning_materials.training_id')
    qb.where('learning_assignments.id', req.params.assignment_id)
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(materials, MaterialSerializer)

}

export default listRoute
