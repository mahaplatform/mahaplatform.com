import _ from 'lodash'

const AddAdobeProfile = {

  databaseName: 'maha',

  up: async (knex) => {

    const sources = await knex('maha_sources').then(results => {
      return results.reduce((sources, source) => ({
        ...sources,
        [source.id]: source.text
      }), {})
    })

    await knex.schema.table('maha_assets', (table) => {
      table.enum('source', _.uniq(Object.values(sources)), { useNative: true, enumName: 'maha_asset_sources' })
    })

    await Promise.mapSeries(Object.keys(sources), async (source_id) => {
      await knex('maha_assets').where('source_id', source_id).update({
        source: source_id ? sources[source_id] : 'device'
      })
    })

    await knex.schema.table('maha_assets', (table) => {
      table.dropColumn('source_id')
    })

    await knex.schema.dropTable('maha_sources')

  },

  down: async (knex) => {
  }

}

export default AddAdobeProfile
