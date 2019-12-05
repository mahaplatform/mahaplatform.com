const UpdateCustomers = {

  up: async (knex) => {

    await knex.raw('drop view finance_customers')

    await knex.raw(`
      create view finance_customers AS
      select distinct on (crm_contacts.id) crm_contacts.id,
      crm_contacts.team_id,
      crm_contacts.first_name,
      crm_contacts.last_name,
      crm_contacts.email,
      crm_contacts.phone,
      crm_contacts.address,
      crm_contacts.braintree_id,
      crm_contacts.created_at,
      crm_contacts.updated_at
      from crm_contacts
      inner join finance_invoices on finance_invoices.customer_id=crm_contacts.id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateCustomers
