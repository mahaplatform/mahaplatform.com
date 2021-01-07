const UpdateChatResults = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create or replace view chat_results AS
      select distinct on (chat_channels.id)
      'channel'::text as type,
      chat_channels.team_id,
      chat_channels.id as channel_id,
      null::integer as message_id,
      chat_subscriptions.user_id,
      concat(chat_channels.name, ' ', chat_channels.subscriber_list) as text,
      chat_channels.last_message_at as date
      from chat_channels
      inner join chat_subscriptions on chat_subscriptions.channel_id = chat_channels.id
      union
      select distinct on (chat_messages.id)
      'message'::text as type,
      chat_messages.team_id,
      null::integer as channel_id,
      chat_messages.id as message_id,
      chat_subscriptions.user_id,
      chat_messages.text,
      chat_messages.created_at as date
      from chat_messages
      inner join chat_channels on chat_channels.id = chat_messages.channel_id
      inner join chat_subscriptions on chat_subscriptions.channel_id = chat_channels.id
      where chat_messages.message_type_id = 2
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateChatResults
