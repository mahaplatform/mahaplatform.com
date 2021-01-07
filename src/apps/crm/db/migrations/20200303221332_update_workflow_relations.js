const UpdateWorkflowRelations = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_workflows', (table) => {
      table.enum('purpose', ['marketing','transactional'], { useNative: true, enumName: 'crm_workflow_purposes' })
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('topic_id').unsigned()
      table.foreign('topic_id').references('crm_topics.id')
      table.integer('field_id').unsigned()
      table.foreign('field_id').references('maha_fields.id')
      table.jsonb('field_config')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowRelations
