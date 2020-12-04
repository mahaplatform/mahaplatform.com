import ProgramAccess from '@apps/crm/models/program_access'
import Program from '@apps/crm/models/program'

const FixProgramAccess = {

  up: async (knex) => {

    const programs = await Program.query(qb => {
      qb.joinRaw('left join crm_program_accesses on crm_program_accesses.program_id=crm_programs.id and crm_program_accesses.type=?', 'manage')
      qb.whereNull('crm_program_accesses.id')
    }).fetchAll({
      withRelated: ['audit'],
      transacting: knex
    })


    await Promise.mapSeries(programs, async (program) => {
      if(program.related('audit').length === 0) return
      const audit = program.related('audit').find(audit => {
        return audit.get('story_id') === 9
      })
      if(!audit) return
      await ProgramAccess.forge({
        team_id: program.get('team_id'),
        program_id: program.get('id'),
        user_id: audit.get('user_id'),
        type: 'manage'
      }).save(null, {
        transacting: knex
      })
    })
    
  },

  down: async (knex) => {
  }

}

export default FixProgramAccess
