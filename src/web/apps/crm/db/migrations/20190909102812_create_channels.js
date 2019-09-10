const CreateChannel = {

  up: async (knex) => {

    await knex.raw(`
      create view crm_channels AS
      select team_id,
      contact_id,
      program_id,
      type,
      email_address_id,
      phone_number_id,
      address_id,
      label,
      has_consented
      from (
      select
      1 as priority,
      maha_programs.team_id,
      crm_email_addresses.contact_id,
      maha_programs.id as program_id,
      'email_address' as type,
      crm_email_addresses.id as email_address_id,
      null::integer as phone_number_id,
      null::integer as address_id,
      crm_email_addresses.address as label,
      crm_consents.id is not null and crm_consents.unsubscribed_at is null as has_consented
      from maha_programs
      inner join crm_email_addresses on crm_email_addresses.team_id=maha_programs.team_id
      left join crm_consents on crm_consents.email_address_id=crm_email_addresses.id and crm_consents.program_id=maha_programs.id
      union
      select
      2 as priority,
      maha_programs.team_id,
      crm_phone_numbers.contact_id,
      maha_programs.id as program_id,
      'phone_number' as type,
      null::integer as email_address_id,
      crm_phone_numbers.id as phone_number_id,
      null::integer as address_id,
      crm_phone_numbers.number as label,
      crm_consents.id is not null and crm_consents.unsubscribed_at is null as has_consented
      from maha_programs
      inner join crm_phone_numbers on crm_phone_numbers.team_id=maha_programs.team_id
      left join crm_consents on crm_consents.phone_number_id=crm_phone_numbers.id and crm_consents.program_id=maha_programs.id
      union
      select
      3 as priority,
      maha_programs.team_id,
      crm_addresses.contact_id,
      maha_programs.id as program_id,
      'address' as type,
      null::integer as email_address_id,
      null::integer as phone_number_id,
      crm_addresses.id as address_id,
      crm_addresses.address->>'description' as label,
      crm_consents.id is not null and crm_consents.unsubscribed_at is null as has_consented
      from maha_programs
      inner join crm_addresses on crm_addresses.team_id=maha_programs.team_id
      left join crm_consents on crm_consents.address_id=crm_addresses.id and crm_consents.program_id=maha_programs.id
      ) crm_channels
      order by priority asc
    `)
  },

  down: async (knex) => {
    await knex.raw('drop view crm_channels')
  }

}

export default CreateChannel
