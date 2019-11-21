const CreateInvoice = {

  up: async (knex) => {
    await knex.schema.createTable('finance_invoices', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('coupon_id').unsigned()
      table.foreign('coupon_id').references('finance_coupons.id')
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('maha_assets.id')
      table.string('code')
      table.date('date')
      table.date('due')
      table.text('notes')
      table.timestamp('voided_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_invoices')
  }

}

export default CreateInvoice
