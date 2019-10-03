const CreateUsers = {

  up: async (knex) => {
    return await knex.schema.createTable('maha_users', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password_salt')
      table.string('password_hash')
      table.boolean('is_active').defaultTo(false)
      table.boolean('is_admin').defaultTo(false)
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.integer('security_question_1_id').unsigned()
      table.foreign('security_question_1_id').references('maha_security_questions.id')
      table.string('security_question_1_answer')
      table.integer('security_question_2_id').unsigned()
      table.foreign('security_question_2_id').references('maha_security_questions.id')
      table.string('security_question_2_answer')
      table.string('notification_method')
      table.integer('unread').defaultTo(0)
      table.jsonb('values')
      table.timestamp('activated_at')
      table.timestamp('reset_at')
      table.timestamp('invalidated_at')
      table.timestamp('last_online_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_users')
  }

}

export default CreateUsers
