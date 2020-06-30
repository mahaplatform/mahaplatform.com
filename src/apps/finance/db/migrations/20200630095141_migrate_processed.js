const MigrateProcessed = {

  up: async (knex) => {
    await Promise.mapSeries(['expenses','reimbursements','trips','advances','checks'], async (table) => {
      await knex(`finance_${table}`).where('status','processed').update('status','exported')
    })
  },

  down: async (knex) => {
  }

}

export default MigrateProcessed
