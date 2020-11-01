const UpdateOrgainzations = {

  up: async (knex) => {

    await knex.schema.table('crm_contacts', (table) => {
      table.string('organization')
      table.string('position')
    })

    const positions = await knex('crm_contacts_organizations').select('crm_contacts_organizations.contact_id','crm_organizations.name').innerJoin('crm_organizations','crm_organizations.id','crm_contacts_organizations.organization_id')

    await Promise.mapSeries(positions, async (position) => {
      await knex('crm_contacts').where('id', position.contact_id).update({
        organization: position.name
      })
    })

    await knex.raw('drop view finance_customers')

    await knex.raw('drop view crm_recipients')

    await knex.raw('drop view crm_contact_primaries')

    await knex.raw(`
      create view crm_contact_primaries as
      with email_addresses as (
      select id, contact_id, address
      from crm_email_addresses
      where deleted_at is null
      order by is_primary desc, created_at asc
      ),
      phone_numbers as (
      select id, contact_id, number
      from crm_phone_numbers
      where deleted_at is null
      order by is_primary desc, created_at asc
      ),
      cell_phone_numbers as (
      select id, contact_id, number
      from crm_phone_numbers
      where deleted_at is null
      and can_text=true
      order by is_primary desc, created_at asc
      ),
      mailing_addresses as (
      select id, contact_id, address
      from crm_mailing_addresses
      where deleted_at is null
      order by is_primary desc, created_at asc
      )
      select distinct on (crm_contacts.id) crm_contacts.id as contact_id,
      email_addresses.id as email_id,
      email_addresses.address as email,
      phone_numbers.id as phone_id,
      phone_numbers.number as phone,
      cell_phone_numbers.id as cell_phone_id,
      cell_phone_numbers.number as cell_phone,
      mailing_addresses.id as address_id,
      mailing_addresses.address as address
      from crm_contacts
      left join email_addresses on email_addresses.contact_id=crm_contacts.id
      left join phone_numbers on phone_numbers.contact_id=crm_contacts.id
      left join cell_phone_numbers on cell_phone_numbers.contact_id=crm_contacts.id
      left join mailing_addresses on mailing_addresses.contact_id=crm_contacts.id
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

    await knex.raw(`
      create view crm_recipients as
      select
      'email' as type,
      'marketing' as purpose,
      crm_email_addresses.team_id,
      crm_contacts.id as contact_id,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from crm_email_addresses
      inner join crm_contacts on crm_contacts.id = crm_email_addresses.contact_id
      inner join crm_consents on crm_consents.email_address_id = crm_email_addresses.id and crm_consents.type='email'
      where crm_email_addresses.deleted_at is null
      and crm_email_addresses.is_valid
      union
      select
      'email' as type,
      'transactional' as purpose,
      crm_email_addresses.team_id,
      crm_email_addresses.contact_id,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from crm_email_addresses
      inner join crm_contact_primaries on crm_contact_primaries.email_id = crm_email_addresses.id
      inner join crm_contacts on crm_contacts.id = crm_contact_primaries.contact_id
      union
      select
      'sms' as type,
      'marketing' as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from crm_phone_numbers
      inner join crm_contacts on crm_contacts.id = crm_phone_numbers.contact_id
      inner join crm_consents on crm_consents.email_address_id = crm_phone_numbers.id and crm_consents.type='sms'
      where crm_phone_numbers.deleted_at is null
      and crm_phone_numbers.can_text=true
      union
      select
      'sms' as type,
      'transactional' as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from crm_phone_numbers
      inner join crm_contact_primaries on crm_contact_primaries.cell_phone_id = crm_phone_numbers.id
      inner join crm_contacts on crm_contacts.id = crm_contact_primaries.contact_id
      union
      select
      'voice' as type,
      'marketing' as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from crm_phone_numbers
      inner join crm_contacts on crm_contacts.id = crm_phone_numbers.contact_id
      inner join crm_consents on crm_consents.email_address_id = crm_phone_numbers.id and crm_consents.type='voice'
      where crm_phone_numbers.deleted_at is null
      union
      select
      'voice' as type,
      'transactional' as purpose,
      crm_phone_numbers.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from crm_phone_numbers
      inner join crm_contact_primaries on crm_contact_primaries.phone_id = crm_phone_numbers.id
      inner join crm_contacts on crm_contacts.id = crm_contact_primaries.contact_id
      union
      select
      'mail' as type,
      'marketing' as purpose,
      crm_mailing_addresses.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_mailing_addresses.id as mailing_address_id,
      crm_consents.program_id,
      crm_contacts.photo_id
      from crm_mailing_addresses
      inner join crm_contacts on crm_contacts.id = crm_mailing_addresses.contact_id
      inner join crm_consents on crm_consents.email_address_id = crm_mailing_addresses.id and crm_consents.type='mail'
      where crm_mailing_addresses.deleted_at is null
      union
      select
      'mail' as type,
      'transactional' as purpose,
      crm_mailing_addresses.team_id,
      crm_contacts.id as contact_id,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_mailing_addresses.id as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from crm_mailing_addresses
      inner join crm_contact_primaries on crm_contact_primaries.address_id = crm_mailing_addresses.id
      inner join crm_contacts on crm_contacts.id = crm_contact_primaries.contact_id
    `)

    await knex.schema.dropTable('crm_taggings')

    await knex.schema.dropTable('crm_tags')

    await knex.schema.dropTable('crm_contacts_organizations')

    await knex.schema.dropTable('crm_organizations')

  },

  down: async (knex) => {
  }

}

export default UpdateOrgainzations
