import ScanAssetQueue from '@apps/maha/queues/scan_asset_queue'

const ScanAssets = {

  up: async (knex) => {

    const assets = await knex('maha_assets').whereNull('is_infected')

    await Promise.map(assets, async asset => {
      await ScanAssetQueue.enqueue({ knex }, { id: asset.id })
    })

  },

  down: async (knex) => {
  }

}

export default ScanAssets
