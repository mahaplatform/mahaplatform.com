const CreateSmsAttachment = {

  up: async (knex) => {
    await knex.schema.createTable('crm_sms_attachments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('sms_id').unsigned()
      table.foreign('sms_id').references('crm_smses.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_sms_attachments')
  }

}

export default CreateSmsAttachment
