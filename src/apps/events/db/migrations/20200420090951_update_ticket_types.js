const UpdateTicketTypes = {

  up: async (knex) => {
    await knex.schema.table('events_ticket_types', (table) => {
      table.bool('is_tax_deductible')
      table.decimal('tax_rate', 3, 2)
    })
    await knex('events_ticket_types').update({
      is_tax_deductible: false,
      tax_rate: 0.00
    })
  },

  down: async (knex) => {
  }

}

export default UpdateTicketTypes
