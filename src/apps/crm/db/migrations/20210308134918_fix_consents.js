const FixConsents = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
    create or replace view crm_channels AS
    select team_id,
    contact_id,
    program_id,
    type,
    email_address_id,
    phone_number_id,
    mailing_address_id,
    label,
    optin_reason,
    optedin_at,
    optout_reason,
    optout_reason_other,
    optedout_at,
    code,
    has_consented
    from (
    select
    1 as priority,
    crm_programs.team_id,
    crm_email_addresses.contact_id,
    crm_programs.id as program_id,
    'email' as type,
    crm_email_addresses.id as email_address_id,
    null::integer as phone_number_id,
    null::integer as mailing_address_id,
    crm_email_addresses.address as label,
    crm_consents.optin_reason,
    crm_consents.optedin_at,
    crm_consents.optout_reason,
    crm_consents.optout_reason_other,
    crm_consents.optedout_at,
    crm_consents.code,
    crm_consents.id is not null and crm_consents.optedout_at is null as has_consented
    from crm_programs
    inner join crm_email_addresses on crm_email_addresses.team_id=crm_programs.team_id
    left join crm_consents on crm_consents.email_address_id=crm_email_addresses.id and crm_consents.program_id=crm_programs.id and crm_consents.type='email'
    where crm_email_addresses.deleted_at is null
    union
    select
    2 as priority,
    crm_programs.team_id,
    crm_phone_numbers.contact_id,
    crm_programs.id as program_id,
    'sms' as type,
    null::integer as email_address_id,
    crm_phone_numbers.id as phone_number_id,
    null::integer as mailing_address_id,
    crm_phone_numbers.number as label,
    crm_consents.optin_reason,
    crm_consents.optedin_at,
    crm_consents.optout_reason,
    crm_consents.optout_reason_other,
    crm_consents.optedout_at,
    crm_consents.code,
    crm_consents.id is not null and crm_consents.optedout_at is null as has_consented
    from crm_programs
    inner join crm_phone_numbers on crm_phone_numbers.team_id=crm_programs.team_id
    left join crm_consents on crm_consents.phone_number_id=crm_phone_numbers.id and crm_consents.program_id=crm_programs.id and crm_consents.type='sms'
    where crm_phone_numbers.deleted_at is null
    union
    select
    3 as priority,
    crm_programs.team_id,
    crm_phone_numbers.contact_id,
    crm_programs.id as program_id,
    'voice' as type,
    null::integer as email_address_id,
    crm_phone_numbers.id as phone_number_id,
    null::integer as mailing_address_id,
    crm_phone_numbers.number as label,
    crm_consents.optin_reason,
    crm_consents.optedin_at,
    crm_consents.optout_reason,
    crm_consents.optout_reason_other,
    crm_consents.optedout_at,
    crm_consents.code,
    crm_consents.id is not null and crm_consents.optedout_at is null as has_consented
    from crm_programs
    inner join crm_phone_numbers on crm_phone_numbers.team_id=crm_programs.team_id
    left join crm_consents on crm_consents.phone_number_id=crm_phone_numbers.id and crm_consents.program_id=crm_programs.id and crm_consents.type='voice'
    where crm_phone_numbers.deleted_at is null
    union
    select
    4 as priority,
    crm_programs.team_id,
    crm_mailing_addresses.contact_id,
    crm_programs.id as program_id,
    'mail' as type,
    null::integer as email_address_id,
    null::integer as phone_number_id,
    crm_mailing_addresses.id as mailing_address_id,
    crm_mailing_addresses.address->>'description' as label,
    crm_consents.optin_reason,
    crm_consents.optedin_at,
    crm_consents.optout_reason,
    crm_consents.optout_reason_other,
    crm_consents.optedout_at,
    crm_consents.code,
    crm_consents.id is not null and crm_consents.optedout_at is null as has_consented
    from crm_programs
    inner join crm_mailing_addresses on crm_mailing_addresses.team_id=crm_programs.team_id
    left join crm_consents on crm_consents.mailing_address_id=crm_mailing_addresses.id and crm_consents.program_id=crm_programs.id and crm_consents.type='mail'
    where crm_mailing_addresses.deleted_at is null
    ) crm_channels
    order by priority asc
    `)

  },

  down: async (knex) => {
  }

}

export default FixConsents
