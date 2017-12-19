import { Migration } from 'maha'

const MigrateReimbursements = new Migration({

  up: async (knex) => {
    
    const expenses = await knex('expenses_expenses').whereNull('account_id')

    await Promise.map(expenses, async expense => {
      
      const id = expense.id
        
      const reimbursement_id = await knex('expenses_reimbursements').insert({
        team_id: expense.team_id,
        user_id: expense.user_id,
        project_id: expense.project_id,
        expense_type_id: expense.expense_type_id,
        vendor_id: expense.vendor_id,
        status_id: expense.status_id,
        date: expense.date,
        amount: expense.amount,
        description: expense.description,
        batch_id: expense.batch_id,
        created_at: expense.created_at,
        updated_at: expense.updated_at
      }).returning('id')
    
      await knex('expenses_receipts').where({ expense_id: id }).update({
        expense_id: null,
        reimbursement_id: reimbursement_id[0]
      })

      await knex('maha_listenings').where({ listenable_type: 'expenses_advances', listenable_id: id }).update({
        listenable_type: 'expenses_reimbursements',
        listenable_id: reimbursement_id[0]
      })
    
      await knex('maha_comments').where({ commentable_type: 'expenses_expenses', commentable_id: id }).update({
        commentable_type: 'expenses_reimbursements',
        commentable_id: reimbursement_id[0]
      })
    
      await knex('maha_audits').where({ auditable_type: 'expenses_expenses', auditable_id: id }).update({
        auditable_type: 'expenses_reimbursements',
        auditable_id: reimbursement_id[0]
      })
    
      await knex('maha_activities').where({ object_table: 'expenses_expenses', object_id: id }).update({
        object_table: 'expenses_reimbursements',
        object_id: reimbursement_id[0]
      })
    
      await await knex('expenses_expenses').where({ id }).del()
    
    })
    
  },

  down: async (knex) => {}

})

export default MigrateReimbursements
