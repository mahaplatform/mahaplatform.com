const CreateTopic = {

  up: async (knex) => {

    await knex.schema.createTable('crm_topics', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('title')
      table.timestamps()
    })

    await knex.schema.createTable('crm_interests', (table) => {
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('topic_id').unsigned()
      table.foreign('topic_id').references('crm_topics.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_topics')
  }

}

export default CreateTopic
