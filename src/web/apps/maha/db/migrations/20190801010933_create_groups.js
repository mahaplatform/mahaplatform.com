import moment from 'moment'

const copyUsers = async(knex, title) => {

  const group = await knex('maha_groups').insert({
    team_id: 1,
    title,
    created_at: moment(),
    updated_at: moment()
  }).returning('id')

  const role = await knex('maha_roles').where({ team_id: 1, title })

  const assignments = await knex('maha_users_roles').where('role_id', role[0].id)

  await knex('maha_users_groups').insert(assignments.map(assignment => ({
    user_id: assignment.user_id,
    group_id: group[0]
  })))

}

const CreateGroups = {

  up: async (knex) => {

    await knex.schema.table('maha_groups', (table) => {
      table.dropColumn('is_everyone')
    })

    await copyUsers(knex, 'Benefits Eligible Employees')

    await copyUsers(knex, 'Independent Contractors / Partners')

    await copyUsers(knex, 'Temp Employees')

  },

  down: async (knex) => {
  }

}

export default CreateGroups
