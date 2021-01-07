const MigrateDisbursements = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter table finance_disbursements rename to finance_deposits')

    await knex.raw('alter table finance_payments rename column disbursement_id to deposit_id')

    await knex.raw('alter type finance_payments_status add value \'deposited\'')

  },

  down: async (knex) => {
  }

}

export default MigrateDisbursements
