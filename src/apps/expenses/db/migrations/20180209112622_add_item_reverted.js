import { Migration } from 'maha'

const AddItemReverted = new Migration({

  up: async (knex) => {

    await knex('maha_notification_types').insert([
      {
        app_id: 2,
        text: 'item_reverted',
        description: 'one of my advances, expenses, or trips status is reverted'
      }
    ])

  },

  down: async (knex) => {

  }

})

export default AddItemReverted
