import Migration from '../../core/objects/migration'

const CreateSupervisions = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('maha_supervisions', (table) => {
      table.integer('supervisor_id').unsigned()
      table.foreign('supervisor_id').references('maha_users.id')
      table.integer('employee_id').unsigned()
      table.foreign('employee_id').references('maha_users.id')
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_supervisions')
  }

})

export default CreateSupervisions
