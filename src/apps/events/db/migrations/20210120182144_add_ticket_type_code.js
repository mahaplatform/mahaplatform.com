import generateCode from '@core/utils/generate_code'

const AddTicketTypeCode = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('events_ticket_types', (table) => {
      table.string('code')
    })

    const req = { trx: knex }

    const ticket_types = await knex('events_ticket_types')

    await Promise.mapSeries(ticket_types, async (ticket_type) => {

      const code = await generateCode(req, {
        table: 'events_ticket_types'
      })

      await knex('events_ticket_types').where('id', ticket_type.id).update({
        code
      })

    })


  },

  down: async (knex) => {
  }

}

export default AddTicketTypeCode
