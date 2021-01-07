const CreateGroupingsUsers = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view maha_groupings_users AS
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_groupings on maha_groupings.id=1
      union
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_supervisors on maha_supervisors.user_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=2
      union
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_supervisors on maha_supervisors.user_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=2
      union
      select distinct on (maha_users.id) maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_groups on maha_groups.leader_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=3
      union
      select distinct on (maha_users.id) maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join expenses_members on expenses_members.user_id=maha_users.id and expenses_members.member_type_id != 3
      inner join maha_groupings on maha_groupings.id=4
    `)

  },

  down: async (knex) => {
  }

}

export default CreateGroupingsUsers
