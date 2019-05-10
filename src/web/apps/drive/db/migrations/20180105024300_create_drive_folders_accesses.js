const CreateDriveFoldersAccesses = {

  up: async (knex) => {

    await knex.raw(`
      create or replace view drive_folders_accesses AS
      select distinct on (drive_folders.id, maha_users.id)
      drive_folders.id as folder_id,
      maha_users.id as user_id,
      drive_access_types.text as access_type
      from drive_folders
      inner join drive_access on drive_access.folder_id=drive_folders.id
      inner join drive_access_types on drive_access_types.id=drive_access.access_type_id
      left join maha_groups on maha_groups.id=drive_access.group_id
      left join maha_users_groups on maha_users_groups.group_id = maha_groups.id
      left join maha_users on maha_users.id = drive_access.user_id or (maha_groups.is_everyone = false and maha_users.id = maha_users_groups.user_id) or (maha_groups.is_everyone = true)
      order by folder_id, user_id, access_type_id
    `)

    await knex.raw(`
      create or replace view drive_items_accesses AS
      select distinct on ("drive_items"."id","drive_folders_accesses"."user_id")
      "drive_items"."id" as "item_id",
      "drive_folders_accesses"."user_id",
      "drive_folders_accesses"."access_type"
      from "drive_items"
      inner join "drive_folders_accesses" on "drive_folders_accesses"."folder_id" = "drive_items"."folder_id" or ("drive_items"."type" = 'folder' and "drive_folders_accesses"."folder_id" = "drive_items"."item_id")
    `)

    await knex.schema.table('drive_folders', (table) => {
      table.dropColumn('is_everyone')
    })

  },

  down: async (knex) => {
    return await knex.raw('drop view drive_folders_accesses')
  }

}

export default CreateDriveFoldersAccesses
