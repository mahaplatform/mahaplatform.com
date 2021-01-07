import Event from '@apps/events/models/event'

const AddTicketTypeDelta = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('events_ticket_types', (table) => {
      table.integer('delta')
      table.boolean('is_active')
    })

    const events = await Event.fetchAll({
      withRelated: ['ticket_types'],
      transacting: knex
    })

    await Promise.mapSeries(events, async(event) => {
      await Promise.mapSeries(event.related('ticket_types'), async(ticket_type, delta) => {
        await ticket_type.save({
          is_active: true,
          delta
        },{
          transacting: knex,
          patch: true
        })
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddTicketTypeDelta
