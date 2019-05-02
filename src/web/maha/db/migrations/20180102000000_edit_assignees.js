import Migration from '../../core/objects/migration'

const EditAssignees = new Migration({

  up: async (knex) => {
    
    await knex.raw('drop view maha_assignees')
    
    await knex.raw(`
      create or replace view maha_assignees AS
      select row_number() over (order by "assignees"."type" ASC, "assignees"."last_name" ASC) as id,
      "assignees".*
      from (
      select 'everyone' as type,
      0 as "item_id",
      "maha_teams"."id" as "team_id",
      'Everyone' as "last_name",
      'Everyone' as "name",
      null as "initials",
      0 as "photo_id",
      null as "created_at",
      null as "updated_at"
      from "maha_teams"
      union
      select 'group' as type,
      "maha_groups"."id" as "item_id",
      "maha_groups"."team_id",
      "maha_groups"."title" as "last_name",
      "maha_groups"."title" as "name",
      null as "initials",
      null as "photo_id",
      "maha_groups"."created_at",
      "maha_groups"."updated_at"
      from "maha_groups"
      union
      select 'user' as type,
      "maha_users"."id" as "item_id",
      "maha_users"."team_id",
      "maha_users"."last_name",
      concat("maha_users"."first_name", ' ', "maha_users"."last_name") as "name",
      concat(lower(substring("maha_users"."first_name" from 1 for 1)), lower(substring("maha_users"."last_name" from 1 for 1))) as "initials",
      "maha_users"."photo_id",
      "maha_users"."created_at",
      "maha_users"."updated_at"
      from "maha_users"
      ) as "assignees"
    `)

  },

  down: async (knex) => {

    await knex.raw('drop view maha_assignees')

  }

})

export default EditAssignees
