import ScanAssetQueue from '@apps/maha/queues/scan_asset_queue'
import Asset from '@apps/maha/models/asset'

const MahaAssets = {

  up: async (knex) => {

    const unscanned = await Asset.query(qb => {
      qb.whereNull('is_infected')
    }).fetchAll({
      withRelated: ['team'],
      transacting: knex
    })

    await Promise.mapSeries(unscanned, async (asset) => {
      await ScanAssetQueue.enqueue({
        team: asset.related(['team']),
        trx: knex
      }, {
        id: asset.get('id')
      })
    })

  },

  down: async (knex) => {
  }

}

export default MahaAssets
