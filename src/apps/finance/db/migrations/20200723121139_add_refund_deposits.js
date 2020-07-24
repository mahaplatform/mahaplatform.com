const AddRefundDeposits = {

  up: async (knex) => {

    await knex.schema.table('finance_refunds', (table) => {
      table.integer('deposit_id').unsigned()
      table.foreign('deposit_id').references('finance_deposits.id')
    })

    const deposit = await knex('finance_deposits').insert({
      team_id: 1,
      bank_id: 1,
      date: '2020-06-15',
      status: 'pending',
      created_at: '2020-06-05 21:00:00',
      updated_at: '2020-06-05 21:00:00'
    }).returning('*').then(results => results[0])

    const allocations = await knex.select('finance_allocations.*','finance_payments.created_at as paid_at').from('finance_allocations').innerJoin('finance_payments','finance_payments.id','finance_allocations.payment_id')

    await knex.raw('drop view finance_allocations')

    await knex.schema.createTable('finance_allocations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('refund_id').unsigned()
      table.foreign('refund_id').references('finance_refunds.id')
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
      table.integer('line_item_id').unsigned()
      table.foreign('line_item_id').references('finance_line_items.id')
      table.decimal('amount',6, 2)
      table.decimal('fee',6, 2)
      table.decimal('total',6, 2)
      table.timestamps()
    })

    await Promise.mapSeries(allocations, async (allocation) => {
      await knex('finance_allocations').insert({
        team_id: 1,
        payment_id: allocation.payment_id,
        line_item_id: allocation.line_item_id,
        amount: allocation.amount,
        fee: allocation.fee,
        total: allocation.total,
        created_at: allocation.paid_at,
        updated_at: allocation.paid_at
      })
    })

    const refunds = [
      { refund_id: 1, deposit_id: 28, allocations: [
        { line_item_id: 196, amount: 21.50 },
        { line_item_id: 197, amount: 7.50 }
      ]},
      { refund_id: 2, deposit_id: 28, allocations: [
        { line_item_id: 186, amount: 12.00 }
      ]},
      { refund_id: 3, deposit_id: 28, allocations: [
        { line_item_id: 296, amount: 14.00 },
        { line_item_id: 297, amount: 6.00 },
        { line_item_id: 298, amount: 3.00 },
        { line_item_id: 300, amount: 5.00 },
        { line_item_id: 301, amount: 5.00 },
        { line_item_id: 302, amount: 5.00 }
      ]},
      { refund_id: 4, deposit_id: deposit.id, allocations: [
        { line_item_id: 203, amount: 5.00 },
        { line_item_id: 206, amount: 6.00 }
      ]},
      { refund_id: 5, deposit_id: deposit.id, allocations: [
        { line_item_id: 238, amount: 3.00 },
        { line_item_id: 239, amount: 5.00 },
        { line_item_id: 242, amount: 6.00 }
      ]},
      { refund_id: 6, deposit_id: deposit.id, allocations: [
        { line_item_id: 353, amount: 3.00 },
        { line_item_id: 354, amount: 8.00 },
        { line_item_id: 355, amount: 8.00 },
        { line_item_id: 356, amount: 8.00 },
        { line_item_id: 357, amount: 6.00 }
      ]},
      { refund_id: 7, deposit_id: deposit.id, allocations: [
        { line_item_id: 324, amount: 5.00 },
        { line_item_id: 325, amount: 5.00 },
        { line_item_id: 326, amount: 6.00 },
        { line_item_id: 327, amount: 5.00 },
        { line_item_id: 328, amount: 6.00 }
      ]},
      { refund_id: 8, deposit_id: 40, allocations: [
        { line_item_id: 196, amount: 2.50 },
        { line_item_id: 197, amount: 2.50 }
      ]}
    ]

    await Promise.mapSeries(refunds, async (item) => {
      const refund = await knex('finance_refunds').where('id', item.refund_id).then(results => results[0])
      await knex('finance_refunds').where('id', item.refund_id).update({
        deposit_id: item.deposit_id,
        status: 'deposited'
      })
      await Promise.mapSeries(item.allocations, async (allocation) => {
        await knex('finance_allocations').insert({
          team_id: 1,
          refund_id: refund.id,
          line_item_id: allocation.line_item_id,
          amount: allocation.amount,
          total: allocation.amount,
          created_at: refund.created_at,
          updated_at: refund.updated_at
        })
      })
    })

    await knex.raw('drop view finance_deposit_totals')

    await knex.raw(`
      create view finance_deposit_line_items as
      select finance_payments.deposit_id,
      finance_payments.id as payment_id,
      null::integer as refund_id,
      coalesce(sum(finance_allocations.amount), 0.00) as amount,
      0.00 - coalesce(sum(finance_allocations.fee), 0.00) as fee,
      coalesce(sum(finance_allocations.total), 0.00) as total
      from finance_allocations
      inner join finance_payments on finance_payments.id=finance_allocations.payment_id
      where deposit_id is not null
      group by finance_payments.id, finance_payments.deposit_id
      union
      select finance_refunds.deposit_id,
      null::integer as payment_id,
      finance_refunds.id as refund_id,
      0.00 - coalesce(sum(finance_allocations.amount), 0.00) as amount,
      coalesce(sum(finance_allocations.fee), 0.00) as fee,
      0.00 - coalesce(sum(finance_allocations.total), 0.00) as total
      from finance_allocations
      inner join finance_refunds on finance_refunds.id=finance_allocations.refund_id
      where deposit_id is not null
      group by finance_refunds.id, finance_refunds.deposit_id
      order by deposit_id asc, payment_id asc, refund_id asc
    `)

    await knex.raw(`
      create view finance_deposit_totals as
      select deposit_id,
      count(payment_id) as payments_count,
      count(refund_id) as refunds_count,
      coalesce(sum(total), 0.00) as total,
      coalesce(sum(fee), 0.00) as fee,
      coalesce(sum(amount), 0.00) as amount
      from finance_deposit_line_items
      group by deposit_id
    `)

  },

  down: async (knex) => {
  }

}

export default AddRefundDeposits
