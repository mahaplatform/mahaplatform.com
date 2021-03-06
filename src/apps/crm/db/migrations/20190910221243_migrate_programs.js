const MigratePrograms = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view crm_channels')

    await Promise.mapSeries(['calls','consents','lists','activities','notes','topics'], async (type) => {
      await knex.schema.table(`crm_${type}`, (table) => {
        table.dropColumn('program_id')
      })
    })

    await knex.schema.dropTable('maha_program_accesses')

    await knex.schema.dropTable('maha_program_members')

    await knex.schema.dropTable('maha_programs')

    await knex.schema.createTable('crm_programs', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('logo_id').unsigned()
      table.foreign('logo_id').references('maha_assets.id')
      table.integer('phone_number_id').unsigned()
      table.foreign('phone_number_id').references('maha_phone_numbers.id')
      table.string('title')
      table.string('code')
      table.timestamps()
    })

    await knex.schema.createTable('crm_program_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.integer('grouping_id').unsigned()
      table.foreign('grouping_id').references('maha_groupings.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.enum('type', ['manage','edit','view'], { useNative: true, enumName: 'crm_program_accesses_types' })
      table.timestamps()
    })

    await Promise.mapSeries(['calls','consents','lists','activities','notes','topics'], async (type) => {
      await knex.schema.table(`crm_${type}`, (table) => {
        table.integer('program_id').unsigned()
        table.foreign('program_id').references('crm_programs.id')
      })
    })

    await knex.raw(`
      create view crm_channels AS
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
      ) crm_channels
      order by priority asc
    `)

    await knex.schema.table('crm_lists', (table) => {
      table.dropColumn('description')
    })

  },

  down: async (knex) => {
  }

}

export default MigratePrograms
