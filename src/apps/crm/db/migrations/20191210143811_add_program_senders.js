const AddProgramSenders = {

  databaseName: 'maha',

  up: async (knex) => {

    const programs = await knex('crm_programs')

    await Promise.mapSeries(programs, async(program) => {
      await knex('crm_senders').insert({
        team_id: program.team_id,
        program_id: program.id,
        name: program.title,
        email: `${program.title.replace(/\s*/g,'').toLowerCase()}@mahaplatform.com`,
        is_verified: true
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddProgramSenders
