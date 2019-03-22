import Migration from '../../core/objects/migration'

const CreateSecurityQuestions = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_security_questions', (table) => {
      table.increments('id').primary()
      table.string('text')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_security_questions')
  }

})

export default CreateSecurityQuestions
