const AssignRights = {

  up: async (knex) => {

    const roles = await knex('maha_roles_apps').where('app_id', 22)

    await Promise.mapSeries(roles, async(role) => {
      await knex('maha_roles_rights').insert([
        { role_id: role.role_id, right_id: 31 },
        { role_id: role.role_id, right_id: 32 },
        { role_id: role.role_id, right_id: 33 }
      ])
    })

  },

  down: async (knex) => {
  }

}

export default AssignRights
