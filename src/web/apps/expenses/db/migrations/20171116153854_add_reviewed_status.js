import Migration from '../../../../core/objects/migration'

const AddReviewedStatus = new Migration({

  up: async (knex) => {
    
    const statuses = await knex('expenses_statuses').count('*')
    
    if(statuses[0].count > 0) {

      await knex('expenses_statuses').where({ id: 6 }).update({ text: 'reviewed' })

      await knex('expenses_statuses').insert({ text: 'processed' })
      
    }

    const item_reviewed = await knex('maha_notification_types').where({ app_id: 2, text: 'item_reviewed' }).count('*')
    
    if(item_reviewed.count == 0) {
      await knex('maha_notification_types').insert({
        app_id: 2,
        text: 'item_reviewed',
        description: 'someone reviews an advance, expense, or trip in a project I own'
      })
    }

    const item_processed = await knex('maha_notification_types').where({ app_id: 2, text: 'item_processed' }).count('*')
    
    if(item_processed.count == 0) {
      await knex('maha_notification_types').insert({
        app_id: 2,
        text: 'item_processed',
        description: 'someone processes an advance, expense, or trip in a project I own'
      })
    }

    
  },

  down: async (knex) => {}

})

export default AddReviewedStatus
