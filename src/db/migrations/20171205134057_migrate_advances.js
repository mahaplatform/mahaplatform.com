import { Migration } from 'maha'

const MigrateAdvances = new Migration({

  up: async (knex) => {
    
    const ids = [1,5,7,8]
    
    await Promise.map(ids, async id => {
      
      const advance = await knex('expenses_advances').where({ id })
      
      if(!advance[0]) return
      
      const check_id = await knex('expenses_checks').insert({
        team_id: advance[0].team_id,
        user_id: advance[0].user_id,
        project_id: advance[0].project_id,
        expense_type_id: advance[0].expense_type_id,
        vendor_id: advance[0].vendor_id,
        status_id: advance[0].status_id,
        delivery_method: advance[0].delivery_method,
        date_needed: advance[0].date_needed,
        amount: advance[0].amount,
        description: advance[0].description,
        batch_id: advance[0].batch_id,
        created_at: advance[0].created_at,
        updated_at: advance[0].updated_at
      }).returning('id')
      
      await knex('maha_listenings').where({ listenable_type: 'expenses_advances', listenable_id: id }).update({
        listenable_type: 'expenses_checks',
        listenable_id: check_id[0]
      })

      await knex('maha_comments').where({ commentable_type: 'expenses_advances', commentable_id: id }).update({
        commentable_type: 'expenses_checks',
        commentable_id: check_id[0]
      })
      
      await knex('maha_audits').where({ auditable_type: 'expenses_advances', auditable_id: id }).update({
        auditable_type: 'expenses_checks',
        auditable_id: check_id[0]
      })
      
      await knex('maha_activities').where({ object_table: 'expenses_advances', object_id: id }).update({
        object_table: 'expenses_checks',
        object_id: check_id[0]
      })
      
      await await knex('expenses_advances').where({ id }).del()
      
    })
    
  },

  down: async (knex) => {}

})

export default MigrateAdvances
