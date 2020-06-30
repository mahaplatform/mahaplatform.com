const MigrateProcessed = {

  up: async (knex) => {

    // await knex.raw(`
    //   update maha_stories set text=replace(text,'process','export') where text like ?
    // `, '%process%')
    //
    // await knex('maha_notification_types').where('id', 4).update('code', 'item_exported')
    //
    // await Promise.mapSeries(['expenses','reimbursements','trips','advances','checks'], async (table) => {
    //   await knex.raw(`alter type finance_${table}_status add value 'exported'`)
    // })

    await Promise.mapSeries(['expenses','reimbursements','trips','advances','checks'], async (table) => {
      await knex(`finance_${table}`).where('status','processed').update('status','exported')
    })
  },

  down: async (knex) => {
  }

}

export default MigrateProcessed
