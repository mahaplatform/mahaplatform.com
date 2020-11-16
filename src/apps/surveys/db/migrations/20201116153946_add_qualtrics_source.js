const AddQualtricsSource = {

  up: async (knex) => {
    await knex('maha_sources').insert({
      text: 'qualtrics'
    })
  },

  down: async (knex) => {
  }

}

export default AddQualtricsSource
