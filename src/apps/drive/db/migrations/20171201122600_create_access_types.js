const CreateAccessTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('drive_access_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex('drive_access_types').insert([
      { text: 'edit' },
      { text: 'view' },
      { text: 'revoke' }
    ])

  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_access_types')
  }

}

export default CreateAccessTypes
