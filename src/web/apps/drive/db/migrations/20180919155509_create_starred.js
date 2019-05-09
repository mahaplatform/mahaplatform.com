import Migration from '../../../../core/objects/migration'

const CreateStarred = new Migration({

  up: async (knex) => {

    await knex.raw(`
      create or replace view drive_starred AS
      select "starred".*
      from (
        select "drive_items".*,
        "maha_stars"."user_id" as "starrer_id"
        from "drive_items"
        inner join "maha_stars" on "maha_stars"."starrable_type"=concat('drive_',"drive_items"."type",'s') and "maha_stars"."starrable_id"="drive_items"."item_id"
      ) as "starred"
    `)

  },

  down: async (knex) => {
    await knex.raw('drop view drive_starred')
  }

})

export default CreateStarred
