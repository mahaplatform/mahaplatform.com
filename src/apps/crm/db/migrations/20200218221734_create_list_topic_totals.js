const CreateListTopicTotals = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view crm_list_totals as
      select crm_lists.id as list_id, cast(count(crm_subscriptions.*) as integer) as contacts_count
      from crm_lists
      left join crm_subscriptions on crm_subscriptions.list_id=crm_lists.id
      group by crm_lists.id
    `)

    await knex.raw(`
      create view crm_topic_totals as
      select crm_topics.id as topic_id, cast(count(crm_interests.*) as integer) as contacts_count
      from crm_topics
      left join crm_interests on crm_interests.topic_id=crm_topics.id
      group by crm_topics.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateListTopicTotals
