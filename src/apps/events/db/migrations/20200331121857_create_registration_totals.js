const CreateRegistrationTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view events_registration_totals as
      select event_id,
      coalesce(finance_invoice_payments.paid, 0.00) AS revenue
      from events_registrations
      left join finance_invoice_payments on finance_invoice_payments.invoice_id=events_registrations.invoice_id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateRegistrationTotals
