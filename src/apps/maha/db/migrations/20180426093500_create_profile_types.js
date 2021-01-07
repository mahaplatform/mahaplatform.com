const CreateProfileTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('maha_profile_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('maha_profile_types').insert([
      { text: 'google' },
      { text: 'facebook' }
    ])

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_profile_types')
  }

}

export default CreateProfileTypes
