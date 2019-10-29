const AddTriggers = {

  up: async (knex) => {

    await knex.schema.table('crm_workflows', (table) => {
      table.enum('trigger_type', ['workflow','form','contact','list','interest','email','consent'], { useNative: true, enumName: 'crm_workflows_trigger_type' })
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.integer('form_id').unsigned()
      table.foreign('form_id').references('crm_forms.id')
      table.integer('topic_id').unsigned()
      table.foreign('topic_id').references('crm_topics.id')
      table.integer('list_id').unsigned()
      table.foreign('list_id').references('crm_lists.id')
      table.integer('email_id').unsigned()
      table.foreign('email_id').references('maha_emails.id')
    })

  },

  down: async (knex) => {
  }

}

export default AddTriggers

//completes a workflow

//completed out a form

//contact added to a topic
//contact removed from a topic

//contact opted in to channel
//contact opted out of channel

//contact subscribed to a list
//contact unsubscribed from a list

//contact was sent an email
//contact received an email
//contact opened an email
//contact clicked a link in an email
//contact marked an email as spam
//email bounced
