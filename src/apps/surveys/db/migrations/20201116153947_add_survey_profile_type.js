const AddQualtricsProfileType = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('alter type maha_profiles_type add value \'surveys\'')
  },

  down: async (knex) => {
  }

}

export default AddQualtricsProfileType
