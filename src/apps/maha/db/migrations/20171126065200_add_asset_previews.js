import Migration from '../../core/objects/migration'

const AddAssetPreview = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('maha_asset_statuses', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex.schema.table('maha_assets', (table) => {
      table.integer('status_id').unsigned()
      table.foreign('status_id').references('maha_asset_statuses.id')
    })

    await knex('maha_asset_statuses').insert([
      { text: 'chunked' },
      { text: 'assembled' },
      { text: 'processed' }
    ])

  },

  down: async (knex) => {}

})

export default AddAssetPreview
