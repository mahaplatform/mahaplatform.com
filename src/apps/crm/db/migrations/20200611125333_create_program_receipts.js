const CreateProgramReceipts = {

  databaseName: 'maha',

  up: async (knex) => {

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
    select crm_voice_campaigns.program_id, crm_workflow_recordings.id
    from crm_workflow_recordings
    inner join crm_workflow_actions on crm_workflow_actions.id=crm_workflow_recordings.action_id
    inner join crm_workflow_steps on crm_workflow_steps.id=crm_workflow_actions.step_id
    inner join crm_workflow_enrollments on crm_workflow_enrollments.id=crm_workflow_actions.enrollment_id
    inner join crm_voice_campaigns on crm_voice_campaigns.id=crm_workflow_enrollments.voice_campaign_id
    where crm_workflow_steps.action='voicemail'
    and was_heard=false
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

  },

  down: async (knex) => {
  }

}

export default CreateProgramReceipts
