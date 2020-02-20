import MaterialSerializer from '../../../../serializers/material_serializer'
import Material from '../../../../models/material'

const listRoute = async (req, res) => {

  const materials = await Material.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('training_id', req.params.training_id)
  }).fetchAll({
    withRelated: ['asset.source'],
    transacting: req.trx
  })

  res.status(200).respond(materials, MaterialSerializer)

}

export default listRoute
