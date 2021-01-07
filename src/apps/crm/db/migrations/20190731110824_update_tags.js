const UpdateTags = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.dropTable('crm_taggings')

    await knex.schema.dropTable('crm_tags')

    await knex.schema.createTable('crm_tags', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('text')
    })

    await knex.schema.createTable('crm_taggings', (table) => {
      table.integer('tag_id').unsigned()
      table.foreign('tag_id').references('crm_tags.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('organization_id').unsigned()
      table.foreign('organization_id').references('crm_organizations.id')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateTags
