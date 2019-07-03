const Answering = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_answerings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('administration_id').unsigned()
      table.foreign('administration_id').references('learning_administrations.id')
      table.integer('question_id').unsigned()
      table.foreign('question_id').references('learning_questions.id')
      table.integer('answer_id').unsigned()
      table.foreign('answer_id').references('learning_answers.id')
      table.boolean('is_correct')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_answerings')
  }

}

export default Answering
