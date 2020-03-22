const UpdateMembers = {

  up: async (knex) => {
    await knex.schema.dropTable('news_members')
    await knex.schema.createTable('news_members', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('news_group_id').unsigned()
      table.foreign('news_group_id').references('news_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('grouping_id').unsigned()
      table.foreign('grouping_id').references('maha_groupings.id')
      table.timestamps()
    })

    await knex.raw(`
      create view news_groups_users AS
      select distinct on (members.news_group_id, members.user_id) members.news_group_id,
      members.user_id
      from (
      select news_members.news_group_id,
      maha_users.id as user_id
      from news_members
      inner join maha_groupings_users on maha_groupings_users.grouping_id = news_members.grouping_id
      inner join maha_users on maha_users.id = maha_groupings_users.user_id
      union
      select news_members.news_group_id,
      maha_users_groups.user_id
      from news_members
      inner join maha_users_groups on maha_users_groups.group_id = news_members.group_id
      union
      select news_members.news_group_id,
      maha_users.id as user_id
      from news_members
      inner join maha_users on maha_users.id = news_members.user_id
      ) members
      order by members.news_group_id, members.user_id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateMembers
