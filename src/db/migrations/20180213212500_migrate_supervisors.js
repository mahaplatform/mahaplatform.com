import { Migration } from 'maha'

const MigrateSupervisors = new Migration({

  up: async (knex) => {

    const supervisors = await knex('competencies_supervisors')
    
    await Promise.map(supervisors, async (supervisor) => {
      
      await knex('maha_supervisors').insert({
        team_id: supervisor.team_id,
        user_id: supervisor.user_id,
        created_at: supervisor.created_at,
        updated_at: supervisor.updated_at
      })
      
    })
    
    const supervisions = await knex('competencies_supervisions')

    await Promise.map(supervisions, async (supervision) => {
      
      await knex('maha_supervisions').insert({
        supervisor_id: supervision.supervisor_id,
        employee_id: supervision.employee_id
      })
      
    })
    
    await knex.schema.dropTable('competencies_supervisors')

    await knex.schema.dropTable('competencies_supervisions')

  },

  down: async (knex) => {}

})

export default MigrateSupervisors
