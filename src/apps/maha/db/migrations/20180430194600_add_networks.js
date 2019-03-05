import Migration from '../../core/objects/migration'

const AddNetworks = new Migration({

  up: async (knex) => {

    await knex('maha_profile_types').insert([
      { text: 'instagram' },
      { text: 'dropbox' },
      { text: 'box' }
    ])

  },

  down: async (knex) => {}

})

export default AddNetworks
