const CreatePlatform = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.createTable('platforms', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex.schema.table('apps', (table) => {
      table.integer('platform_id').unsigned()
      table.foreign('platform_id').references('platforms.id')
    })

    const web = await knex('platforms').insert({
      text: 'web'
    }).returning('*').then(results => results[0])

    await knex('apps').update({
      platform_id: web.id
    })

    await knex.schema.table('apps', (table) => {
      table.dropColumn('platform')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('platforms')
  }

}

export default CreatePlatform
