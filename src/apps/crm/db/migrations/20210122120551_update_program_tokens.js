const UpdateProgramTokens = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
    create or replace view crm_program_tokens as
    with contacts as (
    select crm_contacts.id as contact_id,
    crm_contacts.team_id,
    values.key as code,
    values.value
    from crm_contacts,
    jsonb_each(crm_contacts.values) as values
    ),
    fields as (
    select maha_fields.team_id,
    maha_fields.parent_id as program_id,
    maha_fields.code,
    maha_fields.type,
    maha_fields.name->>'token' as token
    from maha_fields
    where maha_fields.parent_type='crm_programs'
    ),
    computed as (
    select contacts.contact_id,
    fields.program_id,
    fields.token,
    case
    when fields.type = 'addressfield' then contacts.value->0->'description'
    else contacts.value->0
    end as value
    from contacts
    inner join fields on fields.team_id=contacts.team_id and fields.code=contacts.code
    ),
    tokens as (
    select computed.contact_id,
    computed.program_id,
    jsonb_object_agg(token, value) as tokens
    from computed
    inner join crm_contacts on crm_contacts.id=computed.contact_id
    group by computed.contact_id,
    computed.program_id
    )
    select crm_contacts.id as contact_id,
    crm_programs.id as program_id,
    case
    when tokens.tokens is null then '{}'::jsonb
    else tokens.tokens
    end as tokens
    from crm_contacts
    inner join crm_programs on crm_programs.team_id=crm_contacts.team_id
    left join tokens on tokens.contact_id=crm_contacts.id and tokens.program_id=crm_programs.id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateProgramTokens
