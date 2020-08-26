const AddQualtricsProfileType = {

  up: async (knex) => {

    await knex('maha_profile_types').insert([
      { text: 'qualtrics' }
    ])

  },

  down: async (knex) => {
  }

}

export default AddQualtricsProfileType
