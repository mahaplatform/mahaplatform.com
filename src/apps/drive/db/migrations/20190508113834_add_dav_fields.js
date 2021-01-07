import _ from 'lodash'

const AddDavFields = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('drive_folders', (table) => {
      table.string('fullpath')
      table.timestamp('locked_at')
      table.integer('locked_by_id').unsigned()
      table.foreign('locked_by_id').references('maha_users.id')
    })

    await knex.schema.table('drive_files', (table) => {
      table.string('label')
      table.string('fullpath')
      table.timestamp('locked_at')
      table.integer('locked_by_id').unsigned()
      table.foreign('locked_by_id').references('maha_users.id')
    })

    const folders = await knex('drive_folders')

    const folderMap = folders.reduce((map, folder) => ({
      ...map,
      [folder.id]: folder
    }), {})

    const getFullPath = (parent_id, fullpath) => {
      if(parent_id === null) return fullpath
      while(!_.isNil(parent_id)) {
        fullpath = `${folderMap[parent_id].label}/${fullpath}`
        parent_id = folderMap[parent_id].parent_id
      }
      return fullpath
    }

    const folderpaths = folders.reduce((fullpaths, folder) => ({
      ...fullpaths,
      [folder.id]: getFullPath(folder.parent_id, folder.label)
    }), {})

    await Promise.map(folders, async folder => {
      await knex('drive_folders').update({
        fullpath: folderpaths[folder.id]
      }).where({ id: folder.id })
    })

    const files = await knex('drive_files')

    const filepaths = files.reduce((fullpaths, file) => ({
      ...fullpaths,
      [file.id]: getFullPath(file.folder_id, file.file_name)
    }), {})

    await Promise.map(files, async file => {
      await knex('drive_files').update({
        label: file.file_name,
        fullpath: filepaths[file.id]
      }).where({ id: file.id })
    })

    await knex.raw('drop view drive_items_access')

    await knex.raw('drop view drive_starred')

    await knex.raw('drop view drive_items')

    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('file_name')
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
      "drive_folders"."locked_at",
      "drive_folders"."locked_by_id",
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
      "drive_files"."locked_at",
      "drive_files"."locked_by_id",
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

  down: async (knex) => {}

}

export default AddDavFields
