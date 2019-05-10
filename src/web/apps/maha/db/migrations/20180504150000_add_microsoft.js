const AddMicrosoft = {

  up: async (knex) => {

    await knex('maha_profile_types').insert([
      { text: 'microsoft' }
    ])

  },

  down: async (knex) => {}

}

export default AddMicrosoft
