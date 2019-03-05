import { Migration } from 'maha'

const CreateSubscriptions = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('chat_subscriptions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('channel_id').unsigned()
      table.foreign('channel_id').references('chat_channels.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamp('last_viewed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('chat_subscriptions')
  }

})

export default CreateSubscriptions
