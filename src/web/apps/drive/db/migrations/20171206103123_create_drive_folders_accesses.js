import Migration from '../../../../core/objects/migration'

const CreateDriveFoldersAccesses = new Migration({

  up: async (knex) => {
    return await knex.raw(`
      create or replace VIEW drive_folders_accesses AS
      select distinct on (drive_folders.id, maha_users.id)
      drive_folders.id as folder_id,
      maha_users.id as user_id,
      CASE WHEN maha_users.id = drive_folders.owner_id THEN 1 ELSE drive_access.access_type_id END as access_type_id
      from drive_folders
      left join drive_access on drive_access.folder_id = drive_folders.id
      left join maha_groups on maha_groups.id = drive_access.group_id
      left join maha_users_groups on maha_users_groups.group_id = maha_groups.id
      left join maha_users on maha_users.id = maha_users_groups.user_id or maha_users.id = drive_access.user_id or maha_users.id = drive_folders.owner_id
    `)

  },

  down: async (knex) => {
    return await knex.raw('drop view drive_folders_accesses')
  }

})

export default CreateDriveFoldersAccesses
