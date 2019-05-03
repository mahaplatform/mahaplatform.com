import Migration from '../../../../../core/objects/migration'

const AddDeletedAt = new Migration({

  up: async (knex) => {

    await knex.schema.table('drive_folders', (table) => {
      table.timestamp('deleted_at')
    })

    await knex.schema.table('drive_files', (table) => {
      table.timestamp('deleted_at')
    })

    await knex.raw('drop view drive_items_accesses')

    await knex.raw('drop view drive_starred')

    await knex.raw('drop view drive_items')

    await knex.raw(`
      create view drive_items AS
      select row_number() over (order by "items"."priority", "items"."label") as id,
      "items".*
      from (
      select
      0 as priority,
      "drive_folders"."code",
      "drive_folders"."id" as item_id,
      "drive_folders"."team_id",
      "drive_folders"."owner_id",
      'folder' as type,
      "drive_folders"."parent_id" as "folder_id",
      null as "asset_id",
      "drive_folders"."label",
      "drive_folders"."deleted_at",
      "drive_folders"."created_at",
      "drive_folders"."updated_at"
      from "drive_folders"
      union
      select
      1 as priority,
      "drive_files"."code",
      "drive_files"."id" as item_id,
      "drive_files"."team_id",
      "drive_files"."owner_id",
      'file' as type,
      "drive_files"."folder_id",
      "drive_versions"."asset_id",
      "drive_files"."file_name" as "label",
      "drive_files"."deleted_at",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "drive_versions" on "drive_versions"."id" = "drive_files"."version_id"
      inner join "maha_assets" on "maha_assets"."id" = "drive_versions"."asset_id"
      ) as "items"
    `)

    await knex.raw(`
      create view drive_items_accesses AS
      select distinct on ("drive_items"."id","drive_folders_accesses"."user_id")
      "drive_items"."id" as "item_id",
      "drive_folders_accesses"."user_id",
      "drive_folders_accesses"."access_type"
      from "drive_items"
      inner join "drive_folders_accesses" on "drive_folders_accesses"."folder_id" = "drive_items"."folder_id" or ("drive_items"."type" = 'folder' and "drive_folders_accesses"."folder_id" = "drive_items"."item_id")
    `)

    await knex.raw(`
      create view drive_starred AS
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

    await knex.schema.table('drive_folders', (table) => {
      table.dropColumn('deleted_at')
    })

    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('deleted_at')
    })

  }

})

export default AddDeletedAt
