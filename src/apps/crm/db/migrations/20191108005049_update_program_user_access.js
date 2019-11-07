const UpdateProgramUserAccess = {

  up: async (knex) => {

    await knex.raw('drop view crm_program_user_access')

    await knex.raw(`
      create view crm_program_user_access AS
      select distinct on (accesses.program_id, accesses.user_id) accesses.program_id,
      accesses.user_id,
      accesses.type
      from (
      select crm_programs.id as program_id,
      maha_users.id as user_id,
      'manage' as type
      from crm_programs, maha_users
      inner join maha_users_roles on maha_users_roles.user_id = maha_users.id
      inner join maha_roles_rights on maha_roles_rights.role_id = maha_users_roles.role_id
      inner join maha_rights on maha_rights.id = maha_roles_rights.right_id and maha_rights.code='manage_all_programs'
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_groupings_users on maha_groupings_users.grouping_id = crm_program_accesses.grouping_id
      inner join maha_users on maha_users.id = maha_groupings_users.user_id
      union
      select crm_program_accesses.program_id,
      maha_users_groups.user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_users_groups on maha_users_groups.group_id = crm_program_accesses.group_id
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_users on maha_users.id = crm_program_accesses.user_id
      ) accesses
      order by accesses.program_id, accesses.user_id, accesses.type
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateProgramUserAccess
