const AddError = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.raw('alter type raw_statuses add value \'error\'')
  },

  down: async (knex) => {
  }

}

export default AddError
