const AddEnrollmentStatus = {

  up: async (knex) => {

    await knex.raw('drop view crm_workflow_results')
    await knex.raw('drop view crm_sms_campaign_results')
    await knex.raw('drop view crm_voice_campaign_results')

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.enum('status', ['active','lost','completed'], { useNative: true, enumName: 'crm_workflow_enrollment_status' })
    })

    await knex('crm_workflow_enrollments').where('was_completed', true).update({
      status: 'completed'
    })

    await knex('crm_workflow_enrollments').where('was_completed', false).update({
      status: 'active'
    })

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.dropColumn('was_completed')
    })

    await knex.raw(`
      create view crm_workflow_results as
      with enrolled as (
    	select workflow_id, count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
    	group by workflow_id
    	),
    	active as (
    	select workflow_id, count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
    	and status='active'
    	group by workflow_id
    	),
    	lost as (
    	select workflow_id, count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
      and status='lost'
    	group by workflow_id
    	),
    	converted as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
    	and was_converted=true
    	group by workflow_id
    	),
    	completed as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
      and status='completed'
    	group by workflow_id
    	)
    	select id as workflow_id,
      coalesce(enrolled.total, 0) as enrolled_count,
      coalesce(active.total, 0) as active_count,
      coalesce(lost.total, 0) as lost_count,
      coalesce(converted.total, 0) as converted_count,
      coalesce(completed.total, 0) as completed_count
    	from crm_workflows
      left join enrolled on enrolled.workflow_id=crm_workflows.id
      left join active on active.workflow_id=crm_workflows.id
    	left join lost on lost.workflow_id=crm_workflows.id
    	left join converted on converted.workflow_id=crm_workflows.id
    	left join completed on completed.workflow_id=crm_workflows.id
    `)

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
      and status='active'
    	group by sms_campaign_id
    	),
    	lost as (
    	select sms_campaign_id, count(*) as count
    	from crm_workflow_enrollments
      where sms_campaign_id is not null
      and status='lost'
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
      and status='completed'
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

export default AddEnrollmentStatus
