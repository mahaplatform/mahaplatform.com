const CreateCreditDetails = {

  up: async (knex) => {

    await knex.raw(`
      create view finance_credit_details as
      select finance_credits.id as credit_id,
      coalesce(sum(finance_payments.amount), 0.00) as applied,
      finance_credits.amount - coalesce(sum(finance_payments.amount), 0.00) as balance
      from finance_credits
      left join finance_payments on finance_payments.credit_id=finance_credits.id and finance_payments.voided_date is null
      group by finance_credits.id
    `)

  },

  down: async (knex) => {
  }

}

export default CreateCreditDetails
