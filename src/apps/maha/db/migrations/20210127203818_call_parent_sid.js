const CallParentSid = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type maha_call_status add value \'intiated\'')

    await knex.raw('alter type maha_direction_type add value \'outbound-dial\'')

    await knex.raw('alter type maha_direction_type add value \'outbound-api\'')

  },

  down: async (knex) => {
  }

}

export default CallParentSid
