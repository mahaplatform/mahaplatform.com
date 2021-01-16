const CreateUseragent = {

  databaseName: 'analytics',

  up: async (knex) => {
    
    await knex.schema.createTable('useragents', (table) => {
      table.increments('id').primary()
      table.integer('device_id').unsigned()
      table.foreign('device_id').references('devices.id')
      table.integer('manufacturer_id').unsigned()
      table.foreign('manufacturer_id').references('manufacturers.id')
      table.integer('os_id').unsigned()
      table.foreign('os_id').references('oses.id')
      table.integer('os_version_id').unsigned()
      table.foreign('os_version_id').references('versions.id')
      table.integer('browser_id').unsigned()
      table.foreign('browser_id').references('browsers.id')
      table.integer('browser_version_id').unsigned()
      table.foreign('browser_version_id').references('versions.id')
      table.text('useragent')
    })

    await knex.schema.table('sessions', (table) => {
      table.integer('useragent_id').unsigned()
      table.foreign('useragent_id').references('useragents.id')
    })

    const sessions = await knex('sessions')

    await Promise.map(sessions, async(session) => {

      if(!session.useragent) return

      const results = await knex('useragents').where('useragent', session.useragent)

      if(results.length > 0) return

      const useragent = await knex('useragents').insert({
        device_id: session.device_id,
        manufacturer_id: session.manufacturer_id,
        os_id: session.os_id,
        os_version_id: session.os_version_id,
        browser_id: session.browser_id,
        browser_version_id: session.browser_version_id,
        useragent: session.useragent
      }).returning('*').then(results => results[0])

      await knex('sessions').where('id', session.id).update({
        useragent_id: useragent.id
      })

    })

    await knex.schema.table('sessions', (table) => {
      table.dropColumn('device_id')
      table.dropColumn('manufacturer_id')
      table.dropColumn('os_id')
      table.dropColumn('os_version_id')
      table.dropColumn('browser_id')
      table.dropColumn('browser_version_id')
      table.dropColumn('useragent')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('useragents')
  }

}

export default CreateUseragent
