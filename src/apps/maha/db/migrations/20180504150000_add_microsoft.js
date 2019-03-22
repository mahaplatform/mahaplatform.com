import Migration from '../../core/objects/migration'

const AddMicrosoft = new Migration({

  up: async (knex) => {

    await knex('maha_profile_types').insert([
      { text: 'microsoft' }
    ])

  },

  down: async (knex) => {}

})

export default AddMicrosoft
