const CreateSmsReceipt = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
    create view crm_sms_receipts as
    with recipients as (
    select distinct on (program_id, phone_number_id)
    crm_phone_numbers.contact_id,
    maha_smses.program_id,
    maha_smses.phone_number_id,
    maha_smses.created_at as last_message_at
    from maha_smses
    inner join crm_phone_numbers on crm_phone_numbers.id=maha_smses.phone_number_id
    inner join crm_contacts on crm_contacts.id=crm_phone_numbers.contact_id
    order by maha_smses.program_id, maha_smses.phone_number_id, maha_smses.created_at desc
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
    )
    select recipients.*, count(messages.*) as unread
    from recipients
    inner join viewings on viewings.phone_number_id=recipients.phone_number_id and viewings.program_id=recipients.program_id
    left join messages on messages.phone_number_id=recipients.phone_number_id and messages.program_id=recipients.program_id
    group by recipients.phone_number_id, recipients.program_id, recipients.contact_id,recipients.last_message_at
    `)

  },

  down: async (knex) => {}

}

export default CreateSmsReceipt
