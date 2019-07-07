const UpdateQuestions = {

  up: async (knex) => {
    await knex.schema.table('learning_questions', table => {
      table.integer('correct_answer_id').unsigned()
      table.foreign('correct_answer_id').references('learning_answers.id')
    })
  },

  down: async (knex) => {}

}

export default UpdateQuestions
