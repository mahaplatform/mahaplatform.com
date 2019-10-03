const AddEveryoneGroups = {

  up: async (knex) => {

    await knex.schema.table('maha_groups', (table) => {
      table.boolean('is_everyone')
    })

    await knex.raw('drop view maha_assignees')

    await knex.raw(`
      create or replace view maha_assignees AS
      select row_number() over (order by "assignees"."type" ASC, "assignees"."last_name" ASC) as id,
      "type", "item_id", "team_id", "name", "initials", "photo_id", "created_at", "updated_at"
      from (
      select 'group' as type,
      "maha_groups"."id" as "item_id",
      "maha_groups"."team_id",
      concat(case when "maha_groups"."is_everyone" then '0' else '1' end, "maha_groups"."title") as "last_name",
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

    await knex.schema.table('maha_groups', (table) => {
      table.dropColumn('is_everyone')
    })


  }

}

export default AddEveryoneGroups
