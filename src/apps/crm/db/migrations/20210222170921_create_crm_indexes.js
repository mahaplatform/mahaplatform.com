const CreateCRMIndexes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_email_addresses', (table) => {
      table.index('contact_id', 'crm_email_addresses_contact_id_fk')
    })

    await knex.schema.table('crm_phone_numbers', (table) => {
      table.index('contact_id', 'crm_phone_numbers_contact_id_fk')
    })

    await knex.schema.table('crm_mailing_addresses', (table) => {
      table.index('contact_id', 'crm_mailing_addresses_contact_id_fk')
    })

    await knex.schema.table('crm_contacts', (table) => {
      table.index('team_id', 'crm_contacts_team_id_fk')
    })

    await knex.raw(`
      create or replace view crm_contact_primaries as
      select distinct on (crm_contacts.id) crm_contacts.id as contact_id,
      email_addresses.id as email_id,
      email_addresses.address as email,
      phone_numbers.id as phone_id,
      phone_numbers.number as phone,
      cell_phone_numbers.id as cell_phone_id,
      cell_phone_numbers.number as cell_phone,
      mailing_addresses.id as address_id,
      mailing_addresses.address
      from crm_contacts
      left join crm_email_addresses email_addresses on (email_addresses.contact_id = crm_contacts.id and email_addresses.is_primary=true and email_addresses.deleted_at is null)
      left join crm_phone_numbers phone_numbers on (phone_numbers.contact_id = crm_contacts.id and phone_numbers.is_primary=true and phone_numbers.deleted_at is null)
      left join crm_phone_numbers cell_phone_numbers on (cell_phone_numbers.contact_id = crm_contacts.id and cell_phone_numbers.is_primary=true and cell_phone_numbers.deleted_at is null and cell_phone_numbers.can_text=true)
      left join crm_mailing_addresses mailing_addresses on (mailing_addresses.contact_id = crm_contacts.id and mailing_addresses.is_primary=true and mailing_addresses.deleted_at is null)
    `)

  },

  down: async (knex) => {
  }

}

export default CreateCRMIndexes
