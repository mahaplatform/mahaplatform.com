const AddNetworks = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('maha_profile_types').insert([
      { text: 'instagram' },
      { text: 'dropbox' },
      { text: 'box' }
    ])

  },

  down: async (knex) => {}

}

export default AddNetworks
