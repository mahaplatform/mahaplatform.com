const CreateEmailResults = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view crm_email_results AS
      with emailables as (
      select team_id, email_campaign_id
      from maha_emails
      group by team_id, email_campaign_id
      ),
      sent as (
      select count(*) as count, email_campaign_id
      from maha_emails
      group by email_campaign_id
      ),
      delivered as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_delivered=true
      group by email_campaign_id
      ),
      bounced as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_bounced=true
      group by email_campaign_id
      ),
      opened as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_opened=true
      group by email_campaign_id
      ),
      mobile as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where is_mobile=true
      group by email_campaign_id
      ),
      desktop as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where is_mobile=false
      group by email_campaign_id
      ),
      clicked as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_clicked=true
      group by email_campaign_id
      ),
      complained as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_complained=true
      group by email_campaign_id
      ),
      unsubscribed as (
      select count(*) as count, email_campaign_id
      from maha_emails
      where was_unsubscribed=true
      group by email_campaign_id
      )
      select
      emailables.team_id,
      emailables.email_campaign_id,
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
      left join sent on sent.email_campaign_id = emailables.email_campaign_id
      left join delivered on delivered.email_campaign_id = emailables.email_campaign_id
      left join bounced on bounced.email_campaign_id = emailables.email_campaign_id
      left join opened on opened.email_campaign_id = emailables.email_campaign_id
      left join mobile on mobile.email_campaign_id = emailables.email_campaign_id
      left join desktop on desktop.email_campaign_id = emailables.email_campaign_id
      left join clicked on clicked.email_campaign_id = emailables.email_campaign_id
      left join complained on complained.email_campaign_id = emailables.email_campaign_id
      left join unsubscribed on unsubscribed.email_campaign_id = emailables.email_campaign_id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateEmailResults
