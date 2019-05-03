import Migration from '../../../../../core/objects/migration'

const AddRejection = new Migration({

  up: async (knex) => {
    
    await knex.schema.table('eatfresh_attractions', (table) => {
      table.string('rejection_reason')
    })

  },

  down: async (knex) => {
    
  }

})

export default AddRejection
