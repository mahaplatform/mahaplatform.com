import Migration from '../../../../../core/objects/migration'

const AlterDecimals2 = new Migration({

  up: async (knex) => {

    await knex.raw('alter table expenses_trips alter column total_miles type numeric(8,1)')
    
  },

  down: async (knex) => {

  }

})

export default AlterDecimals2
