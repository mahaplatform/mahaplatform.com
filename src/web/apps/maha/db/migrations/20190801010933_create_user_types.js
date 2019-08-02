const assignUsers = async(knex, text) => {

  const type = await knex('maha_user_types').insert({ text }).returning('id')

  const role = await knex('maha_roles').where({ team_id: 1, title: text })

  const assignments = await knex('maha_users_roles').where('role_id', role[0].id)

  await Promise.map(assignments, async (assignment) => {
    await knex('maha_users').where({
      id: assignment.user_id
    }).update({
      user_type_id: type[0]
    })
  })

}

const CreateUserTypes = {

  up: async (knex) => {

    await knex.schema.createTable('maha_user_types', (table) => {
      table.increments('id').primary()
      table.string('text')
    })

    await knex.schema.table('maha_users', (table) => {
      table.integer('user_type_id').unsigned()
      table.foreign('user_type_id').references('maha_user_types.id')
    })

    await knex.schema.table('maha_groups', (table) => {
      table.dropColumn('is_everyone')
    })

    await assignUsers(knex, 'Benefits Eligible Employees')

    await assignUsers(knex, 'Temp Employees')

    await assignUsers(knex, 'Independent Contractors / Partners')

    await knex('maha_users').whereNull('user_type_id').update({
      user_type_id: 1
    })

  },

  down: async (knex) => {}

}

export default CreateUserTypes
