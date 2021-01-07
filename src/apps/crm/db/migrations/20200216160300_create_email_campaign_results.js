const CreateEmailCampaignResult = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view crm_email_campaign_results')
    await knex.raw(`
      create view crm_email_campaign_results as
      with emailables as (
      select team_id, email_campaign_id
      from maha_emails
      where email_campaign_id is not null
      group by team_id, email_campaign_id
      ),
      sent as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where email_campaign_id is not null
      group by email_campaign_id
      ),
      delivered as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_delivered=true
      and email_campaign_id is not null
      group by email_campaign_id
      ),
      bounced as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_campaign_id is not null
      group by email_campaign_id
      ),
      opened as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_opened=true
      and email_campaign_id is not null
      group by email_campaign_id
      ),
      total_opened as (
      select maha_emails.email_campaign_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where email_campaign_id is not null
      group by email_campaign_id
      ),
      last_opened as (
      select maha_emails.email_campaign_id, maha_email_activities.created_at as last_opened_at
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where email_campaign_id is not null
      order by maha_email_activities.created_at desc
      limit 1
      ),
      mobile as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where is_mobile=true
      and email_campaign_id is not null
      group by email_campaign_id
      ),
      desktop as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where is_mobile=false
      and email_campaign_id is not null
      group by email_campaign_id
      ),
      clicked as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_clicked=true
      group by email_campaign_id
      ),
      total_clicked as (
      select maha_emails.email_campaign_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='click'
      where email_campaign_id is not null
      group by email_campaign_id
      ),
      forwarded as (
      select maha_emails.email_campaign_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='forward'
      where email_campaign_id is not null
      group by email_campaign_id
      ),
      shared as (
      select maha_emails.email_campaign_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='share'
      where email_campaign_id is not null
      group by email_campaign_id
      ),
      webviewed as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_webviewed=true
      group by email_campaign_id
      ),
      complained as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_complained=true
      group by email_campaign_id
      ),
      unsubscribed as (
      select email_campaign_id, count(*) as count
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
      coalesce(total_opened.count, 0) as total_opened,
      last_opened.last_opened_at,
      coalesce(mobile.count, 0) as mobile,
      coalesce(desktop.count, 0) as desktop,
      coalesce(clicked.count, 0) as clicked,
      coalesce(total_clicked.count, 0) as total_clicked,
      coalesce(forwarded.count, 0) as forwarded,
      coalesce(shared.count, 0) as shared,
      coalesce(webviewed.count, 0) as webviewed,
      coalesce(complained.count, 0) as complained,
      coalesce(unsubscribed.count, 0) as unsubscribed
      from emailables
      left join sent on sent.email_campaign_id = emailables.email_campaign_id
      left join delivered on delivered.email_campaign_id = emailables.email_campaign_id
      left join bounced on bounced.email_campaign_id = emailables.email_campaign_id
      left join opened on opened.email_campaign_id = emailables.email_campaign_id
      left join total_opened on total_opened.email_campaign_id = emailables.email_campaign_id
      left join last_opened on last_opened.email_campaign_id = emailables.email_campaign_id
      left join mobile on mobile.email_campaign_id = emailables.email_campaign_id
      left join desktop on desktop.email_campaign_id = emailables.email_campaign_id
      left join clicked on clicked.email_campaign_id = emailables.email_campaign_id
      left join total_clicked on total_clicked.email_campaign_id = emailables.email_campaign_id
      left join forwarded on forwarded.email_campaign_id = emailables.email_campaign_id
      left join shared on shared.email_campaign_id = emailables.email_campaign_id
      left join webviewed on webviewed.email_campaign_id = emailables.email_campaign_id
      left join complained on complained.email_campaign_id = emailables.email_campaign_id
      left join unsubscribed on unsubscribed.email_campaign_id = emailables.email_campaign_id
    `)
  },

  down: async (knex) => {
    await knex.raw('drop view crm_email_campaign_results')
  }

}

export default CreateEmailCampaignResult
