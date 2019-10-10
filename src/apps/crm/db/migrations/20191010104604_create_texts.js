const CreateText = {

  up: async (knex) => {
    await knex.schema.createTable('crm_texts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('crm_phone_numbers.id')
      table.integer('number_id').unsigned()
      table.foreign('number_id').references('crm_numbers.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.enum('type', ['incoming','outgoing'], { useNative: true, enumName: 'crm_texts_type' })
      table.text('body')
      table.string('sid')
      table.enum('status', ['queued','sent','failed'], { useNative: true, enumName: 'crm_texts_status' })
      table.timestamp('received_at')
      table.timestamp('sent_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_texts')
  }

}

export default CreateText
