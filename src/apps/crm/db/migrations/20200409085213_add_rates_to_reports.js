const AddRatesToReports = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view crm_email_campaign_results')
    await knex.raw(`
      create view crm_email_campaign_results as
      with sent as (
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
      hard_bounced as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_campaign_id is not null
      and bounce_type='Permanent'
      group by email_campaign_id
      ),
      soft_bounced as (
      select email_campaign_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_campaign_id is not null
      and bounce_type='Transient'
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
      select maha_emails.email_campaign_id, max(maha_email_activities.created_at) as last_opened_at
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where email_campaign_id is not null
      group by maha_emails.email_campaign_id
      ),
      mobile as (
      select email_campaign_id, count(*) as count
      from maha_email_activities
      inner join maha_emails on maha_emails.id = maha_email_activities.email_id
      where maha_email_activities.is_mobile=true
      and email_campaign_id is not null
      and maha_email_activities.type='open'
      group by email_campaign_id
      ),
      desktop as (
      select email_campaign_id, count(*) as count
      from maha_email_activities
      inner join maha_emails on maha_emails.id = maha_email_activities.email_id
      where maha_email_activities.is_mobile=false
      and email_campaign_id is not null
      and maha_email_activities.type='open'
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
      crm_email_campaigns.id email_campaign_id,
      crm_email_campaigns.team_id,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(opened.count, 0) = 0 then 0::real
      else (opened.count::real / delivered.count::real)
      end as open_rate,
      case
      when coalesce(sent.count, 0) = 0 then 0::real
      when coalesce(bounced.count, 0) = 0 then 0::real
      else (bounced.count::real / sent.count::real)
      end as bounce_rate,
      case
      when coalesce(opened.count, 0) = 0 then 0::real
      when coalesce(clicked.count, 0) = 0 then 0::real
      else (clicked.count::real / opened.count::real)
      end as click_rate,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(complained.count, 0) = 0 then 0::real
      else (complained.count::real / delivered.count::real)
      end as complaint_rate,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(unsubscribed.count, 0) = 0 then 0::real
      else (unsubscribed.count::real / delivered.count::real)
      end as unsubscribe_rate,
      coalesce(sent.count, 0) as sent,
      coalesce(delivered.count, 0) as delivered,
      coalesce(bounced.count, 0) as bounced,
      coalesce(hard_bounced.count, 0) as hard_bounced,
      coalesce(soft_bounced.count, 0) as soft_bounced,
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
      from crm_email_campaigns
      left join sent on sent.email_campaign_id = crm_email_campaigns.id
      left join delivered on delivered.email_campaign_id = crm_email_campaigns.id
      left join bounced on bounced.email_campaign_id = crm_email_campaigns.id
      left join hard_bounced on hard_bounced.email_campaign_id = crm_email_campaigns.id
      left join soft_bounced on soft_bounced.email_campaign_id = crm_email_campaigns.id
      left join opened on opened.email_campaign_id = crm_email_campaigns.id
      left join total_opened on total_opened.email_campaign_id = crm_email_campaigns.id
      left join last_opened on last_opened.email_campaign_id = crm_email_campaigns.id
      left join mobile on mobile.email_campaign_id = crm_email_campaigns.id
      left join desktop on desktop.email_campaign_id = crm_email_campaigns.id
      left join clicked on clicked.email_campaign_id = crm_email_campaigns.id
      left join total_clicked on total_clicked.email_campaign_id = crm_email_campaigns.id
      left join forwarded on forwarded.email_campaign_id = crm_email_campaigns.id
      left join shared on shared.email_campaign_id = crm_email_campaigns.id
      left join webviewed on webviewed.email_campaign_id = crm_email_campaigns.id
      left join complained on complained.email_campaign_id = crm_email_campaigns.id
      left join unsubscribed on unsubscribed.email_campaign_id = crm_email_campaigns.id
    `)
    await knex.raw('drop view crm_email_results')
    await knex.raw(`
      create view crm_email_results as
      with sent as (
      select email_id, count(*) as count
      from maha_emails
      where email_id is not null
      group by email_id
      ),
      delivered as (
      select email_id, count(*) as count
      from maha_emails
      where was_delivered=true
      and email_id is not null
      group by email_id
      ),
      bounced as (
      select email_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_id is not null
      group by email_id
      ),
      hard_bounced as (
      select email_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_id is not null
      and bounce_type='Permanent'
      group by email_id
      ),
      soft_bounced as (
      select email_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and email_id is not null
      and bounce_type='Transient'
      group by email_id
      ),
      opened as (
      select email_id, count(*) as count
      from maha_emails
      where was_opened=true
      and email_id is not null
      group by email_id
      ),
      total_opened as (
      select maha_emails.email_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where maha_emails.email_id is not null
      group by maha_emails.email_id
      ),
      last_opened as (
      select maha_emails.email_id, max(maha_email_activities.created_at) as last_opened_at
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where maha_emails.email_id is not null
      group by maha_emails.email_id
      ),
      mobile as (
      select email_id, count(*) as count
      from maha_emails
      where is_mobile=true
      and email_id is not null
      group by email_id
      ),
      desktop as (
      select email_id, count(*) as count
      from maha_emails
      where is_mobile=false
      and email_id is not null
      group by email_id
      ),
      clicked as (
      select email_id, count(*) as count
      from maha_emails
      where was_clicked=true
      group by email_id
      ),
      total_clicked as (
      select maha_emails.email_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='click'
      where maha_emails.email_id is not null
      group by maha_emails.email_id
      ),
      forwarded as (
      select maha_emails.email_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='forward'
      where maha_emails.email_id is not null
      group by maha_emails.email_id
      ),
      shared as (
      select maha_emails.email_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='share'
      where maha_emails.email_id is not null
      group by maha_emails.email_id
      ),
      webviewed as (
      select email_id, count(*) as count
      from maha_emails
      where was_webviewed=true
      group by email_id
      ),
      complained as (
      select email_id, count(*) as count
      from maha_emails
      where was_complained=true
      group by email_id
      ),
      unsubscribed as (
      select email_id, count(*) as count
      from maha_emails
      where was_unsubscribed=true
      group by email_id
      )
      select
      crm_emails.id as email_id,
      crm_emails.team_id,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(opened.count, 0) = 0 then 0::real
      else (opened.count::real / delivered.count::real)
      end as open_rate,
      case
      when coalesce(sent.count, 0) = 0 then 0::real
      when coalesce(bounced.count, 0) = 0 then 0::real
      else (bounced.count::real / sent.count::real)
      end as bounce_rate,
      case
      when coalesce(opened.count, 0) = 0 then 0::real
      when coalesce(clicked.count, 0) = 0 then 0::real
      else (clicked.count::real / opened.count::real)
      end as click_rate,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(complained.count, 0) = 0 then 0::real
      else (complained.count::real / delivered.count::real)
      end as complaint_rate,
      case
      when coalesce(delivered.count, 0) = 0 then 0::real
      when coalesce(unsubscribed.count, 0) = 0 then 0::real
      else (unsubscribed.count::real / delivered.count::real)
      end as unsubscribe_rate,
      coalesce(sent.count, 0) as sent,
      coalesce(delivered.count, 0) as delivered,
      coalesce(bounced.count, 0) as bounced,
      coalesce(hard_bounced.count, 0) as hard_bounced,
      coalesce(soft_bounced.count, 0) as soft_bounced,
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
      from crm_emails
      left join sent on sent.email_id = crm_emails.id
      left join delivered on delivered.email_id = crm_emails.id
      left join bounced on bounced.email_id = crm_emails.id
      left join hard_bounced on hard_bounced.email_id = crm_emails.id
      left join soft_bounced on soft_bounced.email_id = crm_emails.id
      left join opened on opened.email_id = crm_emails.id
      left join total_opened on total_opened.email_id = crm_emails.id
      left join last_opened on last_opened.email_id = crm_emails.id
      left join mobile on mobile.email_id = crm_emails.id
      left join desktop on desktop.email_id = crm_emails.id
      left join clicked on clicked.email_id = crm_emails.id
      left join total_clicked on total_clicked.email_id = crm_emails.id
      left join forwarded on forwarded.email_id = crm_emails.id
      left join shared on shared.email_id = crm_emails.id
      left join webviewed on webviewed.email_id = crm_emails.id
      left join complained on complained.email_id = crm_emails.id
      left join unsubscribed on unsubscribed.email_id = crm_emails.id
    `)
  },

  down: async (knex) => {
  }

}

export default AddRatesToReports
