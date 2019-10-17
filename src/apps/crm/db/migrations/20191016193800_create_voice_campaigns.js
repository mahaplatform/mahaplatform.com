const CreateVoiceCampaign = {

  up: async (knex) => {
    await knex.schema.createTable('crm_voice_campaigns', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('maha_programs.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.enum('direction', ['inbound','outbound'], { useNative: true, enumName: 'crm_voice_campaigns_direction' })
      table.enum('status', ['draft','published'], { useNative: true, enumName: 'crm_voice_campaigns_status' })
      table.string('title')
      table.string('code')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_voice_campaigns')
  }

}

export default CreateVoiceCampaign
