import { Migration } from 'maha'

const CreateDriveItemsAccesses = new Migration({

  up: async (knex) => {

    return await knex.raw(`
      create or replace VIEW drive_items_accesses AS
      select distinct on (item_id,user_id)
      item_id, user_id,
      case
      when folder_3_user_id = user_id and folder_3_access_type_id = 3 then 3
      when folder_2_user_id = user_id and folder_2_access_type_id = 3 then 3
      when folder_1_user_id = user_id and folder_1_access_type_id = 3 then 3
      when folder_user_id = user_id and folder_access_type_id = 3 then 3
      when folder_user_id = user_id then folder_access_type_id
      when folder_1_user_id = user_id then folder_1_access_type_id
      when folder_2_user_id = user_id then folder_2_access_type_id
      when folder_3_user_id = user_id then folder_3_access_type_id
      else 1
      end as access_type_id
      from (
      select
      drive_items.id as item_id,
      case
      when fa3.user_id is not null then fa3.user_id
      when fa2.user_id is not null then fa2.user_id
      when fa1.user_id is not null then fa1.user_id
      when fa.user_id is not null then fa.user_id
      else drive_items.owner_id
      end as user_id,
      fa3.user_id as folder_3_user_id,
      fa3.access_type_id as folder_3_access_type_id,
      fa2.user_id as folder_2_user_id,
      fa2.access_type_id as folder_2_access_type_id,
      fa1.user_id as folder_1_user_id,
      fa1.access_type_id as folder_1_access_type_id,
      fa.user_id as folder_user_id,
      fa.access_type_id as folder_access_type_id
      from drive_items
      left join drive_folders_accesses fa3 on fa3.folder_id = drive_items.folder_3_id
      left join drive_folders_accesses fa2 on fa2.folder_id = drive_items.folder_2_id
      left join drive_folders_accesses fa1 on fa1.folder_id = drive_items.folder_1_id
      left join drive_folders_accesses fa on fa.folder_id = drive_items.item_id and drive_items.type='folder'
      order by id, fa3.user_id, fa2.user_id, fa1.user_id, fa.user_id
      ) as access
    `)

  },

  down: async (knex) => {
    return await knex.raw('drop view drive_items_accesses')

  }

})

export default CreateDriveItemsAccesses
