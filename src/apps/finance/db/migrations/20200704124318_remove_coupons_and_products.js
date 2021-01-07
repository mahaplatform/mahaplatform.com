const RemoveCouponsAndProducts = {

  databaseName: 'maha',

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

    const duck_race = await knex('crm_forms').where('id', 1).then(results => results[0])

    await knex('crm_forms').where('id', 1).update({
      config: {
        ...duck_race.config,
        fields: duck_race.config.fields.map((field, index) => {
          if(index !== 9) return field
          return {
            ...field,
            products: [{
              code: 'a4bd7hjab6',
              description: '1 Duck',
              project_id: 160,
              revenue_type_id: 47,
              price: 5.00,
              tax_rate: 0.00
            },
            {
              code: 'b5tyab8jse',
              description: '5 Ducks',
              project_id: 160,
              revenue_type_id: 47,
              price: 20.00,
              tax_rate: 0.00
            }]
          }
        })
      }
    })

    const purchases = await knex('crm_responses').where('form_id', 1)

    await Promise.mapSeries(purchases, async (purchase) => {
      await  knex('crm_responses').where('id', purchase.id).update({
        data: {
          ...purchase.data,
          ce7r1j: {
            ...purchase.data.ce7r1j,
            products: purchase.data.ce7r1j.products.map(product => {
              if(product.product_id === 1) {
                return {
                  code: 'a4bd7hjab6',
                  description: '1 Duck',
                  project_id: 160,
                  revenue_type_id: 47,
                  quantity: product.quantity,
                  price: 5.00,
                  tax_rate: 0.00,
                  total: product.total
                }
              } else {
                return {
                  code: 'b5tyab8jse',
                  description: '5 Ducks',
                  project_id: 160,
                  revenue_type_id: 47,
                  quantity: product.quantity,
                  price: 20.00,
                  tax_rate: 0.00,
                  total: product.total
                }
              }
            })
          }
        }
      })
    })


  },

  down: async (knex) => {
  }

}

export default RemoveCouponsAndProducts
