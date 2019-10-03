const AddInstallationsDefaultSettings = {

  up: async (knex) => {

    const installations = await knex('maha_installations')

    await knex.schema.table('maha_installations', table => {
      table.dropColumn('settings')
    })

    await knex.schema.table('maha_installations', table => {
      table.jsonb('settings').defaultTo('{}')
    })

    await Promise.map(installations, async installation => {
      await knex('maha_installations').where({
        id: installation.id
      }).update({
        settings: installation.settings
      })
    })

  },

  down: async (knex) => {}

}

export default AddInstallationsDefaultSettings
