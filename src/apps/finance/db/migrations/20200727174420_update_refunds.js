const UpdateRefunds = {

  up: async (knex) => {

    await knex('finance_refunds').where('status', 'deposited').update({
      status: 'withdrawn'
    })
    
  },

  down: async (knex) => {
  }

}

export default UpdateRefunds
