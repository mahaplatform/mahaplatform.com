import Migration from '../../../../core/objects/migration'

const CreateAssignees = new Migration({

  up: async (knex) => {

    return await knex.raw(`
      create or replace VIEW maha_assignees AS
      select row_number() over (order by "users"."type" ASC, "users"."item_id") as id,
      "users".*
      from (
      select 'group' as type,
      "maha_groups"."id" as "item_id",
      "maha_groups"."team_id",
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
      concat("maha_users"."first_name", ' ', "maha_users"."last_name") as "name",
      concat(lower(substring("maha_users"."first_name" from 1 for 1)), lower(substring("maha_users"."last_name" from 1 for 1))) as "initials",
      "maha_users"."photo_id",
      "maha_users"."created_at",
      "maha_users"."updated_at"
      from "maha_users"
      ) as "users"
    `)
  },

  down: async (knex) => {
    return await knex.raw('drop view maha_assignees')
  }

})

export default CreateAssignees
