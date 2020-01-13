const CreateListAndTopicCounts = {

  up: async (knex) => {

    await knex.raw(`
      create view crm_subscription_counts as
      select
      crm_lists.id as list_id,
      cast(count(crm_subscriptions.*) as integer) as subscription_count
      from crm_lists
      left join crm_subscriptions on crm_subscriptions.list_id=crm_lists.id
      group by crm_lists.id
    `)

    await knex.raw(`
      create view crm_interest_counts as
      select
      crm_topics.id as topic_id,
      cast(count(crm_interests.*) as integer) as interest_count
      from crm_topics
      left join crm_interests on crm_interests.topic_id=crm_topics.id
      group by crm_topics.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateListAndTopicCounts
