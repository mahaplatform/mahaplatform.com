const AddWebkitDevice = {

  up: async (knex) => {
    await knex.raw('alter type maha_devices_icon add value \'webkit\'')
  },

  down: async (knex) => {
  }

}

export default AddWebkitDevice
