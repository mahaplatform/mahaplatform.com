const AlterContactCommunications = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_contacts', (table) => {
      table.dropColumn('birth_year')
      table.dropColumn('gender')
      table.dropColumn('ethnicity')
      table.date('birthday').alter()
    })

    await knex.schema.table('crm_email_addresses', (table) => {
      table.boolean('was_hard_bounced')
      table.integer('soft_bounce_count')
      table.timestamp('deleted_at')
    })

    await knex('crm_email_addresses').update({
      was_hard_bounced: false,
      soft_bounce_count: 0
    })

    const bounces = await knex('maha_emails').where('was_bounced', true).whereNotNull('email_address_id')

    await Promise.map(bounces, async (email) => {
      const email_address = await knex('crm_email_addresses').where('id', email.email_address_id).then(results => results[0])
      await knex('crm_email_addresses').where('id', email_address.id).update({
        was_hard_bounced: email.bounce_type === 'Permanent' ? true : email_address.was_hard_bounced,
        soft_bounce_count: parseInt(email_address.soft_bounce_count) + (email.bounce_type !== 'Permanent' ? 1 : 0),
        is_valid: email_address.soft_bounce_count >= 3 || email.bounce_type === 'Permanent' ? false : email_address.is_valid
      })
    })

    await knex.schema.table('maha_smses', (table) => {
      table.integer('error_code')
    })

    await knex('maha_smses').where('status', 'undelivered').update({
      error_code: 30003
    })

    await knex.schema.table('crm_phone_numbers', (table) => {
      table.dropColumn('is_valid')
      table.integer('undelivered_count')
      table.boolean('can_text')
      table.timestamp('deleted_at')
    })

    await knex('crm_phone_numbers').update({
      undelivered_count: 0,
      can_text: true
    })

    const undelivereds = await knex('maha_smses').where('status', 'undelivered').whereNotNull('phone_number_id')

    await Promise.map(undelivereds, async (sms) => {
      const phone_number = await knex('crm_phone_numbers').where('id', sms.phone_number_id).then(results => results[0])
      await knex('crm_phone_numbers').where('id', phone_number.id).update({
        undelivered_count: parseInt(phone_number.undelivered_count) + (sms.error_code !== 30006 ? 1 : 0),
        can_text: phone_number.undelivered_count >= 2 || sms.error_code === 30006 ? false : phone_number.can_text
      })
    })

    await knex.schema.table('crm_mailing_addresses', (table) => {
      table.timestamp('deleted_at')
    })

    await knex.raw('drop view finance_customers')

    await knex.raw('drop view crm_contact_primaries')

    await knex.raw('drop view crm_recipients')

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
      ),
      organizations as (
      select crm_organizations.id, crm_contacts_organizations.contact_id, crm_organizations.name
      from crm_contacts_organizations
      inner join crm_organizations on crm_organizations.id=crm_contacts_organizations.organization_id
      order by crm_organizations.created_at asc
      )
      select distinct on (crm_contacts.id) crm_contacts.id as contact_id,
      organizations.name as organization,
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
      left join organizations on organizations.id=crm_contacts.id
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

  },

  down: async (knex) => {
  }

}

export default AlterContactCommunications
