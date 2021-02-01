const CallParentSid = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_calls', (table) => {
      table.integer('parent_id').unsigned()
      table.foreign('parent_id').references('maha_calls.id')
    })

    await knex.raw('alter type maha_calls_status add value \'initiated\'')

    await knex.raw('alter type maha_direction_type add value \'outbound-dial\'')

    await knex.raw('alter type maha_direction_type add value \'outbound-api\'')

  },

  down: async (knex) => {
  }

}

export default CallParentSid
