const CreateNotifications = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_notifications', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.integer('subject_id').unsigned()
      table.foreign('subject_id').references('maha_users.id')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('maha_stories.id')
      table.integer('object_owner_id').unsigned()
      table.foreign('object_owner_id').references('maha_users.id')
      table.string('code')
      table.string('object_table')
      table.string('object_text')
      table.string('object_id')
      table.string('url')
      table.boolean('is_delivered')
      table.boolean('is_seen')
      table.boolean('is_visited')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_notifications')
  }

}

export default CreateNotifications
