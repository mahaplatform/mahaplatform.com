const RenameMerchants = {

  up: async (knex) => {

    await knex.raw('alter table finance_merchants rename to finance_banks')

    await knex.raw('alter table finance_deposits rename column merchant_id to bank_id')

    await knex.raw('alter table finance_payments rename column merchant_id to bank_id')

    await knex.raw('alter table crm_programs rename column merchant_id to bank_id')

  },

  down: async (knex) => {
  }

}

export default RenameMerchants
