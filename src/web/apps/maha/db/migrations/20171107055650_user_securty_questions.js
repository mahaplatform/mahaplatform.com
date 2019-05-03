import Migration from '../../../../core/objects/migration'

const UserSecurityQuestions = new Migration({

  up: async (knex) => {
    return await knex.schema.table('maha_users', (table) => {
      table.dropColumn('security_question_2_id')
      table.dropColumn('security_question_2_answer')
      table.renameColumn('security_question_1_id', 'security_question_id')
      table.renameColumn('security_question_1_answer', 'security_question_answer')
    })
  },

  down: async (knex) => {
  }

})

export default UserSecurityQuestions
