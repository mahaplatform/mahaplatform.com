import Migration from '../../../../core/objects/migration'

const CreateResults = new Migration({

  up: async (knex) => {

    await knex.raw(`
      create or replace view chat_results AS
      select * from (
      select 'channel' as type,
      "chat_channels"."team_id",
      "chat_channels"."id" as channel_id,
      null as message_id,
      "chat_subscriptions"."user_id",
      concat(name, ' ', subscriber_list) as text,
      "chat_channels"."last_message_at" as date
      from "chat_channels"
      inner join "chat_subscriptions" on "chat_subscriptions"."channel_id" = "chat_channels"."id"
      where "chat_channels"."is_archived" = false
      union
      select 'message' as type,
      "chat_messages"."team_id",
      null as channel_id,
      "chat_messages"."id" as message_id,
      "chat_subscriptions"."user_id",
      "chat_messages"."text",
      "chat_messages"."created_at" as date
      from chat_messages
      inner join "chat_channels" on "chat_channels"."id" = "chat_messages"."channel_id"
      inner join "chat_subscriptions" on "chat_subscriptions"."channel_id" = "chat_channels"."id"
      where "chat_channels"."is_archived" = false
      and "chat_messages"."message_type_id" = 2
      ) results
      order by type, date
    `)

  },

  down: async (knex) => {
    await knex.raw('drop view chat_results')

  }

})

export default CreateResults
