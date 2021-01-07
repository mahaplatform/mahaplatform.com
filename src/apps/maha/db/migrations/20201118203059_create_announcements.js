import GenerateScreenshotQueue from '@apps/maha/queues/generate_screenshot_queue'
import Team from '@apps/maha/models/team'

const CreateAnnouncement = {

  databaseName: 'maha',

  up: async (knex) => {

    const req = {
      trx: knex
    }

    await knex.schema.createTable('maha_announcements', (table) => {
      table.increments('id').primary()
      table.enum('status', ['draft','scheduled','sent'], { useNative: true, enumName: 'maha_announcement_statuses' })
      table.string('title', 255)
      table.string('code', 255)
      table.jsonb('to')
      table.jsonb('config')
      table.timestamp('send_at')
      table.timestamp('sent_at')
      table.integer('job_id')
      table.text('html')
      table.timestamp('deleted_at')
      table.timestamp('screenshoted_at')
      table.timestamps()
    })

    await knex.schema.table('crm_email_campaigns', (table) => {
      table.dropColumn('subject')
      table.dropColumn('reply_to')
    })

    await knex.schema.table('maha_emails', (table) => {
      table.integer('account_id').unsigned()
      table.foreign('account_id').references('maha_accounts.id')
      table.integer('announcement_id').unsigned()
      table.foreign('announcement_id').references('maha_announcements.id')
    })

    const campaigns = await knex('crm_email_campaigns').whereIn('id', [55,100,104,137,138,166])

    await Promise.mapSeries(campaigns, async(campaign) => {

      req.team = await Team.query(qb => {
        qb.where('id', campaign.team_id)
      }).fetch({
        transacting: req.trx
      })

      const announcement = await knex('maha_announcements').insert({
        status: campaign.status,
        title: campaign.title,
        code: campaign.code,
        config: campaign.config,
        send_at: campaign.send_at,
        sent_at: campaign.sent_at,
        job_id: campaign.job_id,
        html: campaign.html,
        deleted_at: campaign.deleted_at,
        screenshoted_at: campaign.screenshoted_at,
        created_at: campaign.created_at,
        updated_at: campaign.updated_at
      }).returning('*').then(results => results[0])

      await GenerateScreenshotQueue.enqueue(req, {
        announcement_id: announcement.id
      })

      const emails = await knex('maha_emails').where('email_campaign_id', campaign.id)

      await Promise.mapSeries(emails, async(email) => {

        const to = email.to.match(/<(.*)>/)[1]

        const account = await knex('maha_accounts').where('email', to).then(results => results[0])

        await knex('maha_emails').where('email_campaign_id', campaign.id).update({
          email_campaign_id: null,
          ...account ? {
            account_id: account.id,
            announcement_id: announcement.id
          } : {}
        })

      })

      const audits = await knex('maha_audits').where({
        auditable_type: 'crm_email_campaigns',
        auditable_id: campaign.id
      })

      await Promise.mapSeries(audits, async(audit) => {
        await knex('maha_audits').where('id', audit.id).update({
          auditable_type: 'maha_announcements',
          auditable_id: announcement.id
        })
      })

      await knex('crm_activities').where('type', 'email_campaign').whereRaw('data->\'email_campaign_id\'=?', campaign.id).del()

      const activities = await knex('maha_activities').where({
        object_table: 'crm_email_campaigns',
        object_id: campaign.id
      })

      await Promise.mapSeries(activities, async(activity) => {
        await knex('maha_activities').where('id', activity.id).update({
          object_table: 'maha_announcements',
          object_type: 'announcement',
          object_id: announcement.id,
          url: `/platform/announcements/${announcement.id}`
        })
      })

      const workflow = await knex('crm_workflows').where('email_campaign_id', campaign.id).then(results => results[0])

      await knex('maha_audits').where({
        auditable_type: 'crm_workflows',
        auditable_id: workflow.id
      }).del()

      const enrollments = await knex('crm_workflow_enrollments').where('workflow_id', workflow.id)

      await Promise.mapSeries(enrollments, async(enrollment) => {
        await knex('crm_workflow_actions').where('enrollment_id', enrollment.id).del()
        await knex('crm_workflow_enrollments').where('id', enrollment.id).del()
      })

      await knex('crm_workflow_steps').where('workflow_id', workflow.id).del()

      await knex('crm_workflows').where('id', workflow.id).del()

      await knex('crm_email_campaigns').where('id', campaign.id).del()

    })

    await knex.raw(`
      create view maha_announcement_results as
      with sent as (
      select announcement_id, count(*) as count
      from maha_emails
      where announcement_id is not null
      group by announcement_id
      ),
      delivered as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_delivered=true
      and announcement_id is not null
      group by announcement_id
      ),
      bounced as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and announcement_id is not null
      group by announcement_id
      ),
      hard_bounced as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and announcement_id is not null
      and bounce_type='Permanent'
      group by announcement_id
      ),
      soft_bounced as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_bounced=true
      and announcement_id is not null
      and bounce_type='Transient'
      group by announcement_id
      ),
      opened as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_opened=true
      and announcement_id is not null
      group by announcement_id
      ),
      total_opened as (
      select maha_emails.announcement_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where announcement_id is not null
      group by announcement_id
      ),
      last_opened as (
      select maha_emails.announcement_id, max(maha_email_activities.created_at) as last_opened_at
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='open'
      where announcement_id is not null
      group by maha_emails.announcement_id
      ),
      mobile as (
      select announcement_id, count(*) as count
      from maha_email_activities
      inner join maha_emails on maha_emails.id = maha_email_activities.email_id
      where maha_email_activities.is_mobile=true
      and announcement_id is not null
      and maha_email_activities.type='open'
      group by announcement_id
      ),
      desktop as (
      select announcement_id, count(*) as count
      from maha_email_activities
      inner join maha_emails on maha_emails.id = maha_email_activities.email_id
      where maha_email_activities.is_mobile=false
      and announcement_id is not null
      and maha_email_activities.type='open'
      group by announcement_id
      ),
      clicked as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_clicked=true
      group by announcement_id
      ),
      total_clicked as (
      select maha_emails.announcement_id, count(maha_email_activities.*) as count
      from maha_emails
      inner join maha_email_activities on maha_email_activities.email_id=maha_emails.id and maha_email_activities.type='click'
      where announcement_id is not null
      group by announcement_id
      ),
      webviewed as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_webviewed=true
      group by announcement_id
      ),
      complained as (
      select announcement_id, count(*) as count
      from maha_emails
      where was_complained=true
      group by announcement_id
      )
      select
      maha_announcements.id announcement_id,
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
      coalesce(webviewed.count, 0) as webviewed,
      coalesce(complained.count, 0) as complained
      from maha_announcements
      left join sent on sent.announcement_id = maha_announcements.id
      left join delivered on delivered.announcement_id = maha_announcements.id
      left join bounced on bounced.announcement_id = maha_announcements.id
      left join hard_bounced on hard_bounced.announcement_id = maha_announcements.id
      left join soft_bounced on soft_bounced.announcement_id = maha_announcements.id
      left join opened on opened.announcement_id = maha_announcements.id
      left join total_opened on total_opened.announcement_id = maha_announcements.id
      left join last_opened on last_opened.announcement_id = maha_announcements.id
      left join mobile on mobile.announcement_id = maha_announcements.id
      left join desktop on desktop.announcement_id = maha_announcements.id
      left join clicked on clicked.announcement_id = maha_announcements.id
      left join total_clicked on total_clicked.announcement_id = maha_announcements.id
      left join webviewed on webviewed.announcement_id = maha_announcements.id
      left join complained on complained.announcement_id = maha_announcements.id
    `)

  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_announcements')
  }

}

export default CreateAnnouncement
