const CreateStories = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_stories', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_stories')
  }

}

export default CreateStories
