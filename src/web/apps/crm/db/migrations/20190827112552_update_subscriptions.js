const UpdateSubscriptions = {

  up: async (knex) => {

    await knex.schema.table('crm_email_addresses', (table) => {
      table.dropColumn('code')
    })

    await knex.schema.table('crm_subscriptions', (table) => {
      table.dropColumn('contact_id')
      table.integer('email_address_id').unsigned()
      table.foreign('email_address_id').references('crm_email_addresses.id')
    })

    await knex.schema.table('crm_lists', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateSubscriptions
