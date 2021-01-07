import Invoice from '@apps/finance/models/invoice'

const AddInvoiceAudits = {

  databaseName: 'maha',

  up: async (knex) => {

    const invoices = await Invoice.fetchAll({
      transacting: knex
    })

    const created = await knex('maha_stories').where({
      text: 'created'
    })

    await Promise.map(invoices, async (invoice) => {
      await knex('maha_audits').insert({
        team_id: invoice.get('team_id'),
        auditable_type: 'finance_invoices',
        auditable_id: invoice.id,
        story_id: created[0].id,
        created_at: invoice.get('created_at'),
        updated_at: invoice.get('created_at')
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddInvoiceAudits
