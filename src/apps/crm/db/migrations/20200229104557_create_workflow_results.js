const CreateWorkflowResult = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.dropTable('actions')
    await knex.schema.dropTable('crm_enrollments')
    await knex.raw(`
      create view crm_workflow_results as
      with enrolled as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
    	group by workflow_id
    	),
    	active as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
    	where was_completed=false and unenrolled_at is null
    	group by workflow_id
    	),
    	lost as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
    	where was_completed=false and unenrolled_at is not null
    	group by workflow_id
    	),
    	converted as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
    	where was_converted=true
    	group by workflow_id
    	),
    	completed as (
    	select workflow_id,count(*) as total
    	from crm_workflow_enrollments
    	where was_completed=true
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
    await knex.schema.dropTable('workflow_results')
  }

}

export default CreateWorkflowResult
