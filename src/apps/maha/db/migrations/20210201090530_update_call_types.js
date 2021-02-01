const CreateCallConnection = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type maha_direction_type add value \'incoming\'')
    await knex.raw('alter type maha_direction_type add value \'outgoing\'')
    await knex.raw('alter type maha_direction_type rename to maha_call_directions')
    await knex.raw('alter table maha_calls rename from_id to from_number_id')
    await knex.raw('alter table maha_calls rename to_id to to_number_id')

  },

  down: async (knex) => {}

}

export default CreateCallConnection
