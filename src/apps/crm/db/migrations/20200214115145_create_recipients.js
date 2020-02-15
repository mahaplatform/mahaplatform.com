const CreateRecipient = {

  up: async (knex) => {

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
      union
      select
      'email' as type,
      'transactional' as purpose,
      crm_email_addresses.team_id,
      crm_contacts.id as contact_id,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as mailing_address_id,
      null::integer as program_id,
      crm_contacts.photo_id
      from crm_email_addresses
      inner join crm_contacts on crm_contacts.id = crm_email_addresses.contact_id
      where crm_email_addresses.is_primary
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
      inner join crm_contacts on crm_contacts.id = crm_phone_numbers.contact_id
      where crm_phone_numbers.is_primary
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
      inner join crm_contacts on crm_contacts.id = crm_phone_numbers.contact_id
      where crm_phone_numbers.is_primary
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
      inner join crm_contacts on crm_contacts.id = crm_mailing_addresses.contact_id
      where crm_mailing_addresses.is_primary
    `)
  },

  down: async (knex) => {
    await knex.schema.dropTable('recipients')
  }

}

export default CreateRecipient
