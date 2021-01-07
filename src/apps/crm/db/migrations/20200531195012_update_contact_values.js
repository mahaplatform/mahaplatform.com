const UpdateContactValues = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('crm_contacts').whereNull('values').update({
      values: {}
    })

  },

  down: async (knex) => {
  }

}

export default UpdateContactValues
