const UpdateVoiceCampaignResults = {

  up: async (knex) => {

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
      ),
      recordings as (
      select voice_campaign_id, count(*) as count
      from crm_workflow_recordings
      inner join crm_workflow_actions on crm_workflow_actions.id=crm_workflow_recordings.action_id
      inner join crm_workflow_enrollments on crm_workflow_enrollments.id=crm_workflow_actions.enrollment_id
      group by voice_campaign_id
      )
      select id as voice_campaign_id,
      coalesce(calls.count, 0) as calls_count,
      coalesce(active.count, 0) as active_count,
      coalesce(lost.count, 0) as lost_count,
      coalesce(hangups.count, 0) as hangups_count,
      coalesce(answering_machines.count, 0) as answering_machines_count,
      coalesce(converted.count, 0) as converted_count,
      coalesce(completed.count, 0) as completed_count,
      coalesce(recordings.count, 0) as recordings_count
      from crm_voice_campaigns
      left join calls on calls.voice_campaign_id=crm_voice_campaigns.id
      left join active on active.voice_campaign_id=crm_voice_campaigns.id
      left join lost on lost.voice_campaign_id=crm_voice_campaigns.id
      left join hangups on hangups.voice_campaign_id=crm_voice_campaigns.id
      left join answering_machines on answering_machines.voice_campaign_id=crm_voice_campaigns.id
      left join converted on converted.voice_campaign_id=crm_voice_campaigns.id
      left join completed on completed.voice_campaign_id=crm_voice_campaigns.id
      left join recordings on recordings.voice_campaign_id=crm_voice_campaigns.id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateVoiceCampaignResults
