const RemoveActiveUsers = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view maha_assignees')

    await knex.raw(`
      create or replace VIEW maha_assignees AS
      select "team_id","user_id","grouping","group_id","full_name","name","initials","photo"
      from (
      select 1 as "priority",
      "maha_teams"."id" as "team_id",
      'everyone' as "grouping",
      cast(null as int) as "user_id",
      cast(null as int) as "group_id",
      'Everyone' as "full_name",
      'Everyone' as "name",
      null as initials,
      null as photo
      from "maha_teams"
      union
      select 2 as "priority",
      "maha_teams"."id" as "team_id",
      'supervisors' as "grouping",
      cast(null as int) as "user_id",
      cast(null as int) as "group_id",
      'Supervisors' as "full_name",
      'Supervisors' as "name",
      null as initials,
      null as photo
      from "maha_teams"
      union
      select 3 as "priority",
      "maha_groups"."team_id",
      null as "grouping",
      cast(null as int) as "user_id",
      "maha_groups"."id" as "group_id",
      "maha_groups"."title" as "full_name",
      "maha_groups"."title" as "name",
      null as initials,
      null as photo
      from "maha_groups"
      union
      select 4 as "priority",
      "maha_users"."team_id",
      null as "grouping",
      "maha_users"."id" as "user_id",
      cast(null as int) as "group_id",
      concat("maha_users"."first_name",' ',"maha_users"."last_name") as "full_name",
      "maha_users"."last_name" as "name",
      concat(left("maha_users"."first_name", 1), left("maha_users"."last_name", 1)) as initials,
      case when "maha_assets"."id" is not null
      then concat('/assets/',"maha_assets"."id",'/',"maha_assets"."file_name")
      else null end as photo
      from "maha_users"
      left join "maha_assets" on "maha_assets"."id"="maha_users"."photo_id"
      where "maha_users"."is_active" = true
      ) as "assignees"
      order by "assignees"."priority" ASC, "assignees"."name" ASC
    `)

  },

  down: async (knex) => {
  }

}

export default RemoveActiveUsers
