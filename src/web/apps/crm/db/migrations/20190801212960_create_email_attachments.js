const CreateEmailAttachment = {

  up: async (knex) => {
    await knex.schema.createTable('crm_email_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('crm_emails.id')
      table.integer('delta')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_email_attachments')
  }

}

export default CreateEmailAttachment
