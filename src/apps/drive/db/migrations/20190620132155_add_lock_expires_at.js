const AddLockExpiresAt = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view drive_items_access')

    await knex.raw('drop view drive_starred')

    await knex.raw('drop view drive_items')

    await knex.schema.table('drive_folders', (table) => {
      table.dropColumn('lock_token')
      table.dropColumn('locked_at')
      table.dropColumn('locked_by_id')
    })

    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('locked_at')
      table.timestamp('lock_expires_at')
    })

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
      'folder' as type,
      "drive_folders"."parent_id" as "folder_id",
      null as "asset_id",
      "drive_folders"."label",
      "drive_folders"."fullpath",
      null as "lock_expires_at",
      null as "locked_by_id",
      null as "lock_token",
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
      'file' as type,
      "drive_files"."folder_id",
      "drive_versions"."asset_id",
      "drive_files"."label",
      "drive_files"."fullpath",
      "drive_files"."lock_expires_at",
      "drive_files"."locked_by_id",
      "drive_files"."lock_token",
      "drive_files"."deleted_at",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "drive_versions" on "drive_versions"."id" = "drive_files"."version_id"
      inner join "maha_assets" on "maha_assets"."id" = "drive_versions"."asset_id"
      ) as "items"
    `)

    await knex.raw(`
      create view drive_items_access AS
      select distinct on (drive_access.code, maha_users.id) drive_access.code, maha_users.id as user_id, drive_access.access_type_id
      from drive_access
      left join maha_users_groups on maha_users_groups.group_id=drive_access.group_id
      inner join maha_users on drive_access.is_everyone=true or maha_users.id=drive_access.user_id or maha_users.id=maha_users_groups.user_id
      order by drive_access.code, maha_users.id, drive_access.access_type_id
    `)

    await knex.raw(`
      create view drive_starred AS
      select "drive_items".*,
      "maha_stars"."user_id" as "starrer_id"
      from "drive_items"
      inner join "maha_stars" on "maha_stars"."starrable_type"=concat('drive_',"drive_items"."type",'s') and "maha_stars"."starrable_id"="drive_items"."item_id"
    `)
    
  },

  down: async (knex) => {
  }

}

export default AddLockExpiresAt
