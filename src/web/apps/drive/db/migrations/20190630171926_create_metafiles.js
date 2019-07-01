const CreateMetaFiles = {

  up: async (knex) => {

    await knex.raw('drop view drive_items_access')

    await knex.raw('drop view drive_starred')

    await knex.raw('drop view drive_items')

    await knex.schema.createTable('drive_metafiles', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('folder_id').unsigned()
      table.foreign('folder_id').references('drive_folders.id')
      table.string('code')
      table.string('label', 255)
      table.text('fullpath')
      table.integer('file_size')
      table.binary('contents')
      table.integer('locked_by_id').unsigned()
      table.string('lock_token', 255)
      table.timestamp('lock_expires_at')
      table.timestamps()
    })

    await knex.schema.alterTable('drive_files', (table) => {
      table.text('fullpath').alter()
    })

    await knex.schema.alterTable('drive_folders', (table) => {
      table.text('fullpath').alter()
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
      "drive_access"."user_id" as "owner_id",
      concat("owners"."first_name",' ',"owners"."last_name") as "owned_by",
      "drive_folders"."label",
      "drive_folders"."fullpath",
      null as "file_size",
      null as "content_type",
      null as "lock_expires_at",
      null as "locked_by_id",
      null as locked_by,
      null as "lock_token",
      "drive_folders"."deleted_at",
      "drive_folders"."created_at",
      "drive_folders"."updated_at"
      from "drive_folders"
      inner join "drive_access" on "drive_access"."code"="drive_folders"."code" and "drive_access"."access_type_id"=1
      inner join "maha_users" "owners" on "owners"."id"="drive_access"."user_id"
      union
      select
      1 as priority,
      "drive_files"."code",
      "drive_files"."id" as item_id,
      "drive_files"."team_id",
      'file' as type,
      "drive_files"."folder_id",
      "drive_versions"."asset_id",
      "drive_access"."user_id" as "owner_id",
      concat("owners"."first_name",' ',"owners"."last_name") as "owned_by",
      "drive_files"."label",
      "drive_files"."fullpath",
      "maha_assets"."file_size",
      "maha_assets"."content_type",
      "drive_files"."lock_expires_at",
      "drive_files"."locked_by_id",
      case when "lockers"."id" is not null
      then concat("lockers"."first_name",' ',"lockers"."last_name")
      else null
      end as "locked_by",
      "drive_files"."lock_token",
      "drive_files"."deleted_at",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "drive_access" on "drive_access"."code"="drive_files"."code" and "drive_access"."access_type_id"=1
      inner join "drive_versions" on "drive_versions"."id" = "drive_files"."version_id"
      inner join "maha_assets" on "maha_assets"."id" = "drive_versions"."asset_id"
      inner join "maha_users" "owners" on "owners"."id"="drive_access"."user_id"
      left join "maha_users" "lockers" on "lockers"."id"="drive_files"."locked_by_id"
      union
      select
      2 as priority,
      "drive_metafiles"."code",
      "drive_metafiles"."id" as item_id,
      "drive_metafiles"."team_id",
      'metafile' as type,
      "drive_metafiles"."folder_id",
      null as "asset_id",
      "drive_access"."user_id" as "owner_id",
      concat("owners"."first_name",' ',"owners"."last_name") as "owned_by",
      "drive_metafiles"."label",
      "drive_metafiles"."fullpath",
      "drive_metafiles"."file_size",
      'application/octet-stream' as "content_type",
      "drive_metafiles"."lock_expires_at",
      "drive_metafiles"."locked_by_id",
      case when "lockers"."id" is not null
      then concat("lockers"."first_name",' ',"lockers"."last_name")
      else null
      end as "locked_by",
      "drive_metafiles"."lock_token",
      null as "deleted_at",
      "drive_metafiles"."created_at",
      "drive_metafiles"."updated_at"
      from "drive_metafiles"
      inner join "drive_access" on "drive_access"."code"="drive_metafiles"."code" and "drive_access"."access_type_id"=1
      inner join "maha_users" "owners" on "owners"."id"="drive_access"."user_id"
      left join "maha_users" "lockers" on "lockers"."id"="drive_metafiles"."locked_by_id"
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
    return await knex.schema.dropTable('drive_files')
  }

}

export default CreateMetaFiles
