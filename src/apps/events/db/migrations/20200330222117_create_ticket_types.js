const CreateTicketType = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('events_ticket_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
      table.string('name')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('finance_projects.id')
      table.integer('revenue_type_id').unsigned()
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
      table.enum('price_type', ['fixed','sliding_scale','free'], { useNative: true, enumName: 'events_ticket_types_price_type' })
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.enum('overage_strategy', ['income','donation'], { useNative: true, enumName: 'events_ticket_types_overage_strategy' })
      table.integer('donation_revenue_type_id').unsigned()
      table.foreign('donation_revenue_type_id').references('finance_revenue_types.id')
      table.integer('total_tickets')
      table.integer('max_per_order')
      table.timestamp('sales_open_at')
      table.timestamp('sales_close_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_ticket_types')
  }

}

export default CreateTicketType
