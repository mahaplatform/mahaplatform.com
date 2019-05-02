import File from '../../models/file'
import { Migration } from 'maha'
import Version from '../../models/version'

const CreateVersions = new Migration({

  up: async (knex) => {
    
    const files = await File.fetchAll()
    
    await Promise.map(files.toArray(), async (file) => {
      
      const version = await Version.forge({
        team_id: file.get('team_id'),
        user_id: file.get('owner_id'),
        file_id: file.get('id'),
        asset_id: file.get('asset_id')
      }).save()
      
      await file.save({ version_id: version.get('id') }, { patch: true })

    })

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
      "maha_assets"."original_file_name" as "label",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "drive_versions" on "drive_versions"."id" = "drive_files"."version_id"
      inner join "maha_assets" on "maha_assets"."id" = "drive_versions"."asset_id"
      ) as "items"
    `)
    
    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('asset_id')
    })    
    
    await knex.schema.dropTable('drive_documents')

  },

  down: async (knex) => {
    return await knex.schema.dropTable('drive_versions')
  }

})

export default CreateVersions
