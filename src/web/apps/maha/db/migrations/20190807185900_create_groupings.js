const CreateGrouping = {

  up: async (knex) => {

    await knex.schema.createTable('maha_groupings', (table) => {
      table.increments('id').primary()
      table.integer('delta')
      table.string('title')
      table.timestamps()
    })

    await knex('maha_groupings').insert([{
      delta: 1,
      title: 'Everyone'
    },{
      delta: 2,
      title: 'Supervisors'
    },{
      delta: 3,
      title: 'Group Leaders'
    },{
      delta: 4,
      title: 'Project Owners / Approvers'
    }])

    await knex.raw('drop view maha_assignees')

    await knex.raw(`
      create or replace VIEW maha_assignees AS
      select "team_id","user_id","grouping_id","group_id","full_name","name","initials","photo","is_active"
      from (
      select
      1 as "priority",
      "maha_teams"."id" as "team_id",
      "maha_groupings"."id" as "grouping_id",
      cast(null as int) as "user_id",
      cast(null as int) as "group_id",
      "maha_groupings"."delta",
      "maha_groupings"."title" as "full_name",
      "maha_groupings"."title" as "name",
      null as initials,
      null as photo,
      true as "is_active"
      from maha_teams
      inner join maha_groupings on maha_groupings.id != 0
      union
      select
      2 as "priority",
      "maha_groups"."team_id",
      cast(null as int) as "grouping_id",
      cast(null as int) as "user_id",
      "maha_groups"."id" as "group_id",
      cast(null as int) as "delta",
      "maha_groups"."title" as "full_name",
      "maha_groups"."title" as "name",
      null as initials,
      null as photo,
      true as "is_active"
      from "maha_groups"
      union
      select
      3 as "priority",
      "maha_users"."team_id",
      cast(null as int) as "grouping_id",
      "maha_users"."id" as "user_id",
      cast(null as int) as "group_id",
      cast(null as int) as "delta",
      concat("maha_users"."first_name",' ',"maha_users"."last_name") as "full_name",
      "maha_users"."last_name" as "name",
      concat(left("maha_users"."first_name", 1), left("maha_users"."last_name", 1)) as initials,
      case when "maha_assets"."id" is not null
      then concat('/assets/',"maha_assets"."id",'/',"maha_assets"."file_name")
      else null end as photo,
      "maha_users"."is_active"
      from "maha_users"
      left join "maha_assets" on "maha_assets"."id"="maha_users"."photo_id") as "assignees"
	    order by "assignees"."priority" ASC, "assignees"."delta" ASC, "assignees"."name" ASC
    `)
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_groupings')
  }

}

export default CreateGrouping
