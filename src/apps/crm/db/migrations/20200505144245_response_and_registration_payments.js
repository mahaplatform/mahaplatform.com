import Registration from '@apps/events/models/registration'
import Response from '@apps/crm/models/response'

const ResponseAndRegistrationPayments = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_responses', (table) => {
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
    })
    await knex.schema.table('events_registrations', (table) => {
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
    })

    const responses = await Response.fetchAll({
      withRelated: ['invoice.payments'],
      transacting: knex
    })

    await Promise.mapSeries(responses, async(response) => {
      if(!response.related('invoice') || response.related('invoice').related('payments').length === 0) return
      const payment = response.related('invoice').related('payments').toArray()[0]
      response.save({
        payment_id: payment.get('id')
      }, {
        transacting: knex
      })
    })

    const registrations = await Registration.fetchAll({
      withRelated: ['invoice.payments'],
      transacting: knex
    })

    await Promise.mapSeries(registrations, async(registration) => {
      if(!registration.related('invoice') || registration.related('invoice').related('payments').length === 0) return
      const payment = registration.related('invoice').related('payments').toArray()[0]
      registration.save({
        payment_id: payment.get('id')
      }, {
        transacting: knex
      })
    })

  },

  down: async (knex) => {
  }

}

export default ResponseAndRegistrationPayments
