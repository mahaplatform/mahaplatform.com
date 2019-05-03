import Migration from '../../../../../core/objects/migration'

const CreatePlans = new Migration({

  up: async (knex) => {
    return await knex.schema.createTable('competencies_plans', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('supervisor_id').unsigned()
      table.foreign('supervisor_id').references('maha_users.id')
      table.integer('employee_id').unsigned()
      table.foreign('employee_id').references('maha_users.id')
      table.date('due')
      table.string('status')
      table.boolean('is_completed').defaultTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('competencies_plans')
  }

})

export default CreatePlans
