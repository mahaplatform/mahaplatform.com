import Payment from '../../models/payment'

const AddPaymentAudits = {

  up: async (knex) => {

    const payments = await Payment.fetchAll({
      withRelated: ['invoice'],
      transacting: knex
    })

    const created = await knex('maha_stories').where({
      text: 'created'
    })

    const made = await knex('maha_stories').insert({
      text: 'payment made'
    }).returning('*')

    const settled = await knex('maha_stories').insert({
      text: 'settled'
    }).returning('*')

    const deposited = await knex('maha_stories').insert({
      text: 'deposited'
    }).returning('*')

    await Promise.map(payments, async (payment) => {
      await knex('maha_audits').insert({
        team_id: payment.get('team_id'),
        contact_id: payment.related('invoice').get('customer_id'),
        auditable_type: 'finance_invoices',
        auditable_id: payment.get('invoice_id'),
        story_id: made[0].id,
        created_at: payment.get('created_at'),
        updated_at: payment.get('created_at')
      })
      await knex('maha_audits').insert({
        team_id: payment.get('team_id'),
        contact_id: payment.related('invoice').get('customer_id'),
        auditable_type: 'finance_payments',
        auditable_id: payment.id,
        story_id: created[0].id,
        created_at: payment.get('created_at'),
        updated_at: payment.get('created_at')
      })
      if(payment.get('status') === 'settled') {
        await knex('maha_audits').insert({
          team_id: payment.get('team_id'),
          auditable_type: 'finance_payments',
          auditable_id: payment.id,
          story_id: settled[0].id,
          created_at: payment.get('updated_at'),
          updated_at: payment.get('updated_at')
        })
      }
      if(payment.get('status') === 'deposited') {
        await knex('maha_audits').insert({
          team_id: payment.get('team_id'),
          auditable_type: 'finance_payments',
          auditable_id: payment.id,
          story_id: deposited[0].id,
          created_at: payment.get('updated_at'),
          updated_at: payment.get('updated_at')
        })
      }
    })

  },

  down: async (knex) => {
  }

}

export default AddPaymentAudits
