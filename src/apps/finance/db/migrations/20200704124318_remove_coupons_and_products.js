const RemoveCouponsAndProducts = {

  up: async (knex) => {

    await knex.raw('drop view finance_coupon_uses')

    await knex.raw('drop view finance_coupon_statuses')

    await knex.schema.table('finance_invoices', (table) => {
      table.dropColumn('coupon_id')
    })

    await knex.raw(`
    create or replace view finance_invoice_line_items as
    with totals as (
    select finance_line_items.id as line_item_id,
    finance_line_items.quantity * finance_line_items.price as total,
    finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
    round(finance_line_items.quantity * finance_line_items.price * finance_line_items.tax_rate, 2) as tax,
    case
    when finance_line_items.discount_amount is not null then finance_line_items.discount_amount
    when finance_line_items.discount_percent is not null then round(finance_line_items.quantity * finance_line_items.price * finance_line_items.discount_percent, 2)
    else 0.00
    end as discount
    from finance_line_items
    )
    select finance_line_items.id as line_item_id,
    finance_line_items.invoice_id,
    finance_line_items.delta,
    0 as product_id,
    finance_line_items.project_id,
    finance_line_items.revenue_type_id,
    finance_line_items.description,
    finance_line_items.quantity,
    finance_line_items.price,
    totals.total,
    totals.tax,
    totals.discount,
    totals.total + totals.tax - totals.discount as allocated,
    finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
    finance_line_items.is_tax_deductible,
    finance_line_items.created_at
    from finance_line_items
    inner join totals on totals.line_item_id = finance_line_items.id
    order by id desc
    `)

    await knex.raw('drop view finance_customer_products')

    await knex.schema.table('finance_line_items', (table) => {
      table.dropColumn('product_id')
    })

    await knex.schema.dropTable('finance_coupons')

    await knex.schema.dropTable('finance_products')

  },

  down: async (knex) => {
  }

}

export default RemoveCouponsAndProducts
