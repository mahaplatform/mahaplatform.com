import { Migration } from 'maha'

const CreateItems = new Migration({

  up: async (knex) => {

    return await knex.raw(`
      create or replace VIEW drive_items AS
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
      "f1"."id" as "folder_1_id",
      "f2"."id" as "folder_2_id",
      "f3"."id" as "folder_3_id",
      null as "asset_id",
      "drive_folders"."label",
      "drive_folders"."created_at",
      "drive_folders"."updated_at"
      from "drive_folders"
      left join "drive_folders" "f1" on "f1"."id" = "drive_folders"."parent_id"
      left join "drive_folders" "f2" on "f2"."id"= "f1"."parent_id"
      left join "drive_folders" "f3" on "f3"."id" = "f2"."parent_id"
      union
      select
      1 as priority,
      "drive_files"."code",
      "drive_files"."id" as item_id,
      "drive_files"."team_id",
      "drive_files"."owner_id",
      'file' as type,
      "f1"."id" as "folder_1_id",
      "f2"."id" as "folder_2_id",
      "f3"."id" as "folder_3_id",
      "drive_files"."asset_id",
      "maha_assets"."original_file_name" as "label",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "maha_assets" on "maha_assets"."id" = "drive_files"."asset_id"
      left join "drive_folders" "f1" on "f1"."id" = "drive_files"."folder_id"
      left join "drive_folders" "f2" on "f2"."id"= "f1"."parent_id"
      left join "drive_folders" "f3" on "f3"."id" = "f2"."parent_id"
      union
      select
      1 as priority,
      "drive_documents"."code",
      "drive_documents"."id" as item_id,
      "drive_documents"."team_id",
      "drive_documents"."owner_id",
      'document' as type,
      "f1"."id" as "folder_1_id",
      "f2"."id" as "folder_2_id",
      "f3"."id" as "folder_3_id",
      null as "asset_id",
      "drive_documents"."name" as "label",
      "drive_documents"."created_at",
      "drive_documents"."updated_at"
      from "drive_documents"
      left join "drive_folders" "f1" on "f1"."id" = "drive_documents"."folder_id"
      left join "drive_folders" "f2" on "f2"."id"= "f1"."parent_id"
      left join "drive_folders" "f3" on "f3"."id" = "f2"."parent_id"
      ) as "items"
    `)

  },

  down: async (knex) => {
    return await knex.raw('drop view drive_items')
  }

})

export default CreateItems
