const RemoveStepDependencies = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view crm_program_receipts')

    await knex.raw(`
    create view crm_program_receipts as
    with recipients as (
    select distinct on (program_id, phone_number_id)
    crm_phone_numbers.contact_id,
    maha_smses.program_id,
    maha_smses.phone_number_id
    from maha_smses
    inner join crm_phone_numbers on crm_phone_numbers.id=maha_smses.phone_number_id
    inner join crm_contacts on crm_contacts.id=crm_phone_numbers.contact_id
    order by maha_smses.program_id, maha_smses.phone_number_id, maha_smses.id, maha_smses.body, maha_smses.created_at desc
    ),
    viewings as (
    select recipients.program_id,
    recipients.phone_number_id,
    case
    when crm_channel_views.id is null then crm_contacts.created_at
    else crm_channel_views.last_viewed_at
    end as last_viewed_at
    from recipients
    inner join crm_phone_numbers on crm_phone_numbers.id=recipients.phone_number_id
    inner join crm_contacts on crm_contacts.id=crm_phone_numbers.contact_id
    left join crm_channel_views on crm_channel_views.phone_number_id=recipients.phone_number_id and crm_channel_views.type='sms'
    ),
    messages as (
    select maha_smses.id,
    maha_smses.program_id,
    maha_smses.phone_number_id
    from maha_smses
    inner join viewings on viewings.phone_number_id=maha_smses.phone_number_id and viewings.program_id=maha_smses.program_id
    where direction='inbound'
    and maha_smses.created_at > viewings.last_viewed_at
    ),
    unread as (
    select crm_programs.id as program_id,
    count(messages.*)::integer as unread_messages
    from crm_programs
    left join messages on messages.program_id=crm_programs.id
    group by crm_programs.id
    ),
    voicemails as (
    select maha_calls.program_id,
    maha_voicemails.id
    from maha_voicemails
    inner join maha_calls on maha_calls.id=maha_voicemails.call_id
    and maha_voicemails.was_heard=false
    ),
    unheard as (
    select crm_programs.id as program_id,
    count(voicemails.*)::integer as unheard_voicemails
    from crm_programs
    left join voicemails on voicemails.program_id=crm_programs.id
    group by crm_programs.id
    )
    select crm_programs.id as program_id,
    unread.unread_messages,
    unheard.unheard_voicemails
    from crm_programs
    inner join unread on unread.program_id=crm_programs.id
    inner join unheard on unheard.program_id=crm_programs.id
    `)

    await knex.raw('drop view crm_voice_campaign_results')

    await knex.raw(`
    create view crm_voice_campaign_results as
    with calls as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    group by voice_campaign_id
    ),
    active as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and status='active'
    group by voice_campaign_id
    ),
    lost as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and status='lost'
    group by voice_campaign_id
    ),
    hangups as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and was_hungup=true
    and voice_campaign_id is not null
    group by voice_campaign_id
    ),
    answering_machines as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and was_answering_machine=true
    and voice_campaign_id is not null
    group by voice_campaign_id
    ),
    converted as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and was_converted=true
    group by voice_campaign_id
    ),
    completed as (
    select voice_campaign_id, count(*) as count
    from crm_workflow_enrollments
    where voice_campaign_id is not null
    and status='completed'
    group by voice_campaign_id
    )
    select id as voice_campaign_id,
    coalesce(calls.count, 0) as calls_count,
    coalesce(active.count, 0) as active_count,
    coalesce(lost.count, 0) as lost_count,
    coalesce(hangups.count, 0) as hangups_count,
    coalesce(answering_machines.count, 0) as answering_machines_count,
    coalesce(converted.count, 0) as converted_count,
    coalesce(completed.count, 0) as completed_count
    from crm_voice_campaigns
    left join calls on calls.voice_campaign_id=crm_voice_campaigns.id
    left join active on active.voice_campaign_id=crm_voice_campaigns.id
    left join lost on lost.voice_campaign_id=crm_voice_campaigns.id
    left join hangups on hangups.voice_campaign_id=crm_voice_campaigns.id
    left join answering_machines on answering_machines.voice_campaign_id=crm_voice_campaigns.id
    left join converted on converted.voice_campaign_id=crm_voice_campaigns.id
    left join completed on completed.voice_campaign_id=crm_voice_campaigns.id
    `)

  },

  down: async (knex) => {
  }

}

export default RemoveStepDependencies
