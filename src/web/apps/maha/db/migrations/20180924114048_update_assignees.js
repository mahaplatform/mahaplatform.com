import Migration from '../../../../../../../core/objects/migration'

const UpdateAssignees = new Migration({

  up: async (knex) => {

    await knex.raw('drop view maha_assignees')

    await knex.raw(`
      create view maha_assignees as
      select row_number() over (order by "assignees"."priority" ASC, "assignees"."name" ASC) as id,
      "assignees".*
      from (
      select
      1 as "priority",
      "maha_teams"."id" as "team_id",
      'Everyone' as "name",
      true as "is_everyone",
      cast(null as int) as "user_id",
      cast(null as int) as "group_id"
      from "maha_teams"
      union
      select
      2 as "priority",
      "maha_groups"."team_id",
      "maha_groups"."title" as "name",
      false as "is_everyone",
      cast(null as int) as "user_id",
      "maha_groups"."id" as "group_id"
      from "maha_groups"
      union
      select
      3 as "priority",
      "maha_users"."team_id",
      "maha_users"."last_name" as "name",
      false as "is_everyone",
      "maha_users"."id" as "user_id",
      cast(null as int) as "group_id"
      from "maha_users") as "assignees"
    `)

  },

  down: async (knex) => {

  }

})

export default UpdateAssignees
