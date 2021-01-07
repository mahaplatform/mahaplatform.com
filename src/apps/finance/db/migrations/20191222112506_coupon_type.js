const CouponType = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_coupons', (table) => {
      table.enum('type', ['amount','percent'], { useNative: true, enumName: 'finance_coupons_type' })
      table.date('start_date')
      table.date('end_date')
      table.dropColumn('is_active')
    })

    await knex.raw(`
      create view finance_coupon_uses as
      select crm_contacts.id as customer_id, finance_coupons.id as coupon_id, count(finance_invoices.id) as uses
      from crm_contacts
      left join finance_coupons on true
      inner join finance_invoices on finance_invoices.customer_id=crm_contacts.id and finance_invoices.coupon_id=finance_coupons.id
      group by crm_contacts.id, finance_coupons.id;
    `)

    await knex.raw(`
      create view finance_coupon_statuses as
      select id as coupon_id,
      case
      when (start_date is null or start_date <= now()) and (end_date is null or end_date >=now()) then true
      else false
      end as is_active
      from finance_coupons;
    `)

  },

  down: async (knex) => {
  }

}

export default CouponType
