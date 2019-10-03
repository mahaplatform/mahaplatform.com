import Access from '../../models/access'
import Folder from '../../models/folder'

const UpdateAccess = {

  up: async (knex) => {

    await knex('drive_access_types').where({ id: 1 }).update({ text: 'owner' })

    await knex('drive_access_types').where({ id: 2 }).update({ text: 'edit' })

    await knex('drive_access_types').where({ id: 3 }).update({ text: 'view' })

    const folders = await Folder.fetchAll()

    await Promise.map(folders.toArray(), async (folder) => {

      await Access.forge({
        team_id: folder.get('team_id'),
        user_id: folder.get('owner_id'),
        folder_id: folder.get('id'),
        access_type_id: 1
      }).save()

    })

    await knex.raw('drop view drive_items_accesses')

    await knex.raw('drop view drive_folders_accesses')

    await knex.schema.table('drive_folders', (table) => {
      table.boolean('is_everyone')
    })

  },

  down: async (knex) => {

  }

}

export default UpdateAccess
