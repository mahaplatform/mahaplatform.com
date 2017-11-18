import { Migration } from 'maha'

const InsertListenings = new Migration({

  up: async (knex) => {
    
    const tables = ['expenses_advances','expenses_expenses','expenses_trips']
    
    await Promise.mapSeries(tables, async table => {

      const items = await knex(table)
      
      await Promise.mapSeries(items, async item => {
        
        const { project_id } = item
        
        const approvers = await knex('expenses_members').where({ project_id }).whereIn('member_type_id', [1, 2])
        
        const subscriber_ids = [
          item.user_id,
          ...approvers.map(approver => approver.user_id)
        ]
        
        const listenings = subscriber_ids.map(user_id => ({
          team_id: 1,
          user_id,
          listenable_type: table,
          listenable_id: item.id          
        }))
        
        await knex('maha_listenings').insert(listeners)

      })

    })

  },

  down: async (knex) => {}

})

export default InsertListenings
