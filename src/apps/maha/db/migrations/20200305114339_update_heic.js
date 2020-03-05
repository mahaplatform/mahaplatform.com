import ProcessAssetQueue from '../../queues/process_asset_queue'
import Asset from '../../models/asset'

const UpdateHeic = {

  up: async (knex) => {

    const assets = await Asset.query(qb => {
      qb.where('file_name', 'like', '%.heic')
    }).fetchAll({
      withRelated: ['team'],
      transacting: knex
    })

    await Promise.map(assets, async (asset) => {
      await ProcessAssetQueue.enqueue({
        team: asset.related('team'),
        trx: knex
      }, {
        id: asset.get('id')
      })
    })
  },

  down: async (knex) => {
  }

}

export default UpdateHeic
