import { createConfirmationWorkflow } from '@apps/crm/services/workflows'
import Store from '@apps/stores/models/store'

const BulbsaleWorkflow = {

  databaseName: 'maha',

  up: async (knex) => {

    const store = await Store.where('id', 5).fetch({
      transacting: knex,
      withRelated: ['team']
    })

    const req = {
      trx: knex,
      team: store.related('team')
    }

    await createConfirmationWorkflow(req,  {
      store,
      program_id: store.get('program_id'),
      subject: 'Thank you for your order',
      reply_to: 'mr2285@cornell.edu',
      sender_id: 31
    })

  },

  down: async (knex) => {
  }

}

export default BulbsaleWorkflow
