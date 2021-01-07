const UpdateWorkflowTables = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('crm_voice_campaigns', (table) => {
      table.dropColumn('steps')
      table.jsonb('to')
      table.jsonb('data')
      table.string('job_id')
    })

    await knex.schema.table('crm_sms_campaigns', (table) => {
      table.jsonb('data')
      table.string('job_id')
    })

    await Promise.mapSeries(['enrollments','steps'], async (model) => {
      await knex.schema.table(`crm_workflow_${model}`, (table) => {
        table.integer('voice_campaign_id').unsigned()
        table.foreign('voice_campaign_id').references('crm_voice_campaigns.id')
        table.integer('sms_campaign_id').unsigned()
        table.foreign('sms_campaign_id').references('crm_sms_campaigns.id')
      })
    })

    await knex.schema.table('crm_workflow_enrollments', (table) => {
      table.boolean('was_answering_machine')
      table.boolean('was_hungup')
    })

    await knex.raw('drop view crm_workflow_results')

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
    	and was_completed=false
      and unenrolled_at is null
    	group by workflow_id
    	),
    	lost as (
    	select workflow_id, count(*) as total
    	from crm_workflow_enrollments
      where workflow_id is not null
    	and was_completed=false
      and unenrolled_at is not null
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
    	and was_completed=true
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

  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowTables
