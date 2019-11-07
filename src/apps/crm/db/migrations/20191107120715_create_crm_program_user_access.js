const CreateCrmProgramUserAccess = {

  up: async (knex) => {

    await knex.raw(`
      create view crm_program_user_access AS
      select distinct on (accesses.program_id, accesses.user_id) accesses.program_id,
      accesses.user_id,
      accesses.type
      from (
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      join maha_groupings_users on maha_groupings_users.grouping_id = crm_program_accesses.grouping_id
      join maha_users on maha_users.id = maha_groupings_users.user_id
      union
      select crm_program_accesses.program_id,
      maha_users_groups.user_id,
      crm_program_accesses.type
      from crm_program_accesses
      join maha_users_groups on maha_users_groups.group_id = crm_program_accesses.group_id
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      join maha_users on maha_users.id = crm_program_accesses.user_id
      ) accesses
      order by accesses.program_id, accesses.user_id, accesses.type
    `)

  },

  down: async (knex) => {
  }

}

export default CreateCrmProgramUserAccess
