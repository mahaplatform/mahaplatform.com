const CreateSmsCampaignResult = {

  up: async (knex) => {
    await knex.raw(`
      create view crm_sms_campaign_results as
      with sessions as (
      select sms_campaign_id, count(*) as count
      from crm_workflow_enrollments
      where sms_campaign_id is not null
      group by sms_campaign_id
      ),
    	active as (
    	select sms_campaign_id, count(*) as count
    	from crm_workflow_enrollments
      where sms_campaign_id is not null
    	and was_completed=false
      and unenrolled_at is null
    	group by sms_campaign_id
    	),
    	lost as (
    	select sms_campaign_id, count(*) as count
    	from crm_workflow_enrollments
      where sms_campaign_id is not null
    	and was_completed=false
      and unenrolled_at is not null
    	group by sms_campaign_id
    	),
      converted as (
      select sms_campaign_id, count(*) as count
      from crm_workflow_enrollments
      where sms_campaign_id is not null
      and was_converted=true
      group by sms_campaign_id
      ),
      completed as (
      select sms_campaign_id, count(*) as count
      from crm_workflow_enrollments
      where sms_campaign_id is not null
      and was_completed=true
      group by sms_campaign_id
      )
      select id as sms_campaign_id,
      coalesce(sessions.count, 0) as sessions_count,
      coalesce(active.count, 0) as active_count,
      coalesce(lost.count, 0) as lost_count,
      coalesce(converted.count, 0) as converted_count,
      coalesce(completed.count, 0) as completed_count
      from crm_sms_campaigns
      left join sessions on sessions.sms_campaign_id=crm_sms_campaigns.id
      left join active on active.sms_campaign_id=crm_sms_campaigns.id
      left join lost on lost.sms_campaign_id=crm_sms_campaigns.id
      left join converted on converted.sms_campaign_id=crm_sms_campaigns.id
      left join completed on completed.sms_campaign_id=crm_sms_campaigns.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateSmsCampaignResult
