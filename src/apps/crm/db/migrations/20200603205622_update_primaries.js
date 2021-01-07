const UpdatePrimaries = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view finance_customers')

    await knex.raw('drop view crm_contact_primaries')

    await knex.raw(`
      create view crm_contact_primaries as
      select distinct on (crm_contacts.id) crm_contacts.id as contact_id,
      crm_organizations.name as organization,
      crm_email_addresses.id as email_id,
      crm_email_addresses.address as email,
      crm_phone_numbers.id as phone_id,
      crm_phone_numbers.number as phone,
      crm_mailing_addresses.id as address_id,
      crm_mailing_addresses.address as address
      from crm_contacts
      left join crm_email_addresses on crm_email_addresses.contact_id=crm_contacts.id and crm_email_addresses.is_primary=true
      left join crm_phone_numbers on crm_phone_numbers.contact_id=crm_contacts.id and crm_phone_numbers.is_primary=true
      left join crm_mailing_addresses on crm_mailing_addresses.contact_id=crm_contacts.id and crm_mailing_addresses.is_primary=true
      left join crm_contacts_organizations on crm_contacts_organizations.contact_id=crm_contacts.id
      left join crm_organizations on crm_organizations.id=crm_contacts_organizations.organization_id
    `)

    await knex.raw(`
      create view finance_customers as
      select distinct on (crm_contacts.id) crm_contacts.id,
      crm_contacts.team_id,
      crm_contacts.first_name,
      crm_contacts.last_name,
      crm_contact_primaries.email,
      crm_contact_primaries.phone,
      crm_contact_primaries.address,
      crm_contacts.braintree_id,
      crm_contacts.created_at,
      crm_contacts.updated_at
      from crm_contacts
      inner join finance_invoices on finance_invoices.customer_id=crm_contacts.id
      inner join crm_contact_primaries on crm_contact_primaries.contact_id=crm_contacts.id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdatePrimaries
