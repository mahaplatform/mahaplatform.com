import Material from '../models/material'

export const updateMaterials = async (req, { training_id, asset_ids }) => {

  await Promise.mapSeries(asset_ids, async(asset_id, index) => {
    await Material.forge({
      team_id: req.team.get('id'),
      training_id,
      asset_id
    }).save(null, {
      transacting: req.trx
    })
  })

}
