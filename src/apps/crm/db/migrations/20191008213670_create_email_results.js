const CreateEmailResults = {

  up: async (knex) => {
    await knex.raw(`
      create view crm_email_results AS
      with emailables as (
      select team_id, program_id, emailable_type, emailable_id
      from crm_emails
      group by team_id, program_id, emailable_type, emailable_id
      ),
      sent as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      group by emailable_type, emailable_id
      ),
      delivered as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_delivered=true
      group by emailable_type, emailable_id
      ),
      bounced as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_bounced=true
      group by emailable_type, emailable_id
      ),
      opened as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_opened=true
      group by emailable_type, emailable_id
      ),
      mobile as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where is_mobile=true
      group by emailable_type, emailable_id
      ),
      desktop as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where is_mobile=false
      group by emailable_type, emailable_id
      ),
      clicked as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_clicked=true
      group by emailable_type, emailable_id
      ),
      complained as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_complained=true
      group by emailable_type, emailable_id
      ),
      unsubscribed as (
      select count(*) as count, emailable_type, emailable_id
      from crm_emails
      where was_unsubscribed=true
      group by emailable_type, emailable_id
      )
      select
      emailables.team_id,
      emailables.program_id,
      emailables.emailable_type,
      emailables.emailable_id,
      coalesce(sent.count, 0) as sent,
      coalesce(delivered.count, 0) as delivered,
      coalesce(bounced.count, 0) as bounced,
      coalesce(opened.count, 0) as opened,
      coalesce(mobile.count, 0) as mobile,
      coalesce(desktop.count, 0) as desktop,
      coalesce(clicked.count, 0) as clicked,
      coalesce(complained.count, 0) as complained,
      coalesce(unsubscribed.count, 0) as unsubscribed
      from emailables
      left join sent on sent.emailable_type = emailables.emailable_type and sent.emailable_id = emailables.emailable_id
      left join delivered on delivered.emailable_type = emailables.emailable_type and delivered.emailable_id = emailables.emailable_id
      left join bounced on bounced.emailable_type = emailables.emailable_type and bounced.emailable_id = emailables.emailable_id
      left join opened on opened.emailable_type = emailables.emailable_type and opened.emailable_id = emailables.emailable_id
      left join mobile on mobile.emailable_type = emailables.emailable_type and mobile.emailable_id = emailables.emailable_id
      left join desktop on desktop.emailable_type = emailables.emailable_type and desktop.emailable_id = emailables.emailable_id
      left join clicked on clicked.emailable_type = emailables.emailable_type and clicked.emailable_id = emailables.emailable_id
      left join complained on complained.emailable_type = emailables.emailable_type and complained.emailable_id = emailables.emailable_id
      left join unsubscribed on unsubscribed.emailable_type = emailables.emailable_type and unsubscribed.emailable_id = emailables.emailable_id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateEmailResults
