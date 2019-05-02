import { Migration } from 'maha'

const MigrateAssetStatuses = new Migration({

  up: async (knex) => {

    const statuses = ['chunked','assembled','processed']

    await knex.schema.table('maha_assets', (table) => {
      table.enum('status', statuses)
    })

    const assets = await knex('maha_assets')

    await Promise.mapSeries(assets, async (asset) => {

      await knex('maha_assets').where({
        id: asset.id
      }).update({
        status: statuses[asset.status_id - 1]
      })

    })

    await knex.schema.table('maha_assets', (table) => {
      table.dropColumn('status_id')
    })

    await knex.schema.dropTable('maha_asset_statuses')

  },

  down: async (knex) => {

    await knex.schema.table('maha_assets', (table) => {
      table.dropColumn('status')
    })

  }

})

export default MigrateAssetStatuses
