import { Migration, Group } from 'maha'
import moment from 'moment'

const AdjustFolders = new Migration({

  up: async (knex) => {

    await knex('maha_groups').update({ is_everyone: false })
    
    const everyone = await Group.forge({
      team_id: 1,
      title: 'Everyone',
      is_everyone: true
    }).save()

    await knex('drive_access').whereIn('id', [3,4,5,6]).del()
    
    const folders = await knex('drive_folders')
    
    await Promise.mapSeries(folders, async folder => {

      const approvers = await knex('drive_access').insert({
        team_id: 1,
        folder_id: folder.id,
        group_id: everyone.get('id'),
        access_type_id: 3,
        created_at: moment(),
        updated_at: moment()
      })
      
    })

  },

  down: async (knex) => {}

})

export default AdjustFolders
