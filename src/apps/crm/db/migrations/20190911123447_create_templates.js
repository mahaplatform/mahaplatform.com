const CreateTemplate = {

  up: async (knex) => {
    await knex.schema.createTable('crm_templates', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.integer('parent_id').unsigned()
      table.foreign('parent_id').references('crm_templates.id')
      table.string('title')
      table.enum('type', ['email','web'], { useNative: true, enumName: 'crm_template_type' })
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_templates')
  }

}

export default CreateTemplate
