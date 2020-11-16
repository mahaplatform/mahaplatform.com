const AddDropdownType = {

  up: async (knex) => {
    await knex.raw('alter type maha_fields_type add value \'dropdown\'')
  },

  down: async (knex) => {
  }

}

export default AddDropdownType
