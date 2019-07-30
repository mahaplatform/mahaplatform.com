import generateCode from '../../../../core/utils/generate_code'
import _ from 'lodash'

const AddItemCode = {

  up: async (knex) => {

    await knex.schema.table('expenses_checks', (table) => {
      table.string('account_number')
      table.string('invoice_number')
    })

    await knex.schema.table('expenses_projects', (table) => {
      table.enum('type', ['basic','tax'])
      table.integer('tax_project_id').unsigned()
      table.foreign('tax_project_id').references('expenses_projects.id')
    })

    await knex('expenses_projects').update({
      type: 'basic'
    })

    await knex('expenses_projects').update({
      type: 'tax'
    }).whereIn('id', [52,66,91,134,139,151,153,155,157,173])

    const types = ['checks','expenses','reimbursements']

    await Promise.map(types, async (type) => {
      const include_tax = _.includes(['checks','expenses'], type)
      await knex.schema.table(`expenses_${type}`, (table) => {
        table.string('code')
        table.string('delta')
        table.decimal('total', 9, 2)
        if(!include_tax) return
        table.decimal('tax_total', 6, 2)
        table.decimal('tax', 6, 2)
      })
      const items = await knex(`expenses_${type}`)
      await Promise.map(items, async (item) => {
        await knex(`expenses_${type}`).where({
          id: item.id
        }).update({
          ...include_tax ? {
            tax: 0.00,
            tax_total: 0.00
          } : {},
          total: item.amount ? Number(item.amount).toFixed(2): null,
          code: generateCode(),
          delta: 0
        })
      })
    })

    await knex('maha_installations').where({
      id: 2
    }).update({
      settings: {
        integration: 'accpac',
        tax_expense_type_id: 48,
        trip_expense_type_id: 16
      }
    })

    await knex.raw('drop view expenses_items')

    await knex.raw(`
      create or replace VIEW expenses_items AS
      select row_number() over (order by "items"."type", "items"."item_id") as id,
      "items".*
      from (
      select null as "code",
      "expenses_advances"."id" as "item_id",
      "expenses_advances"."team_id",
      "maha_import_items"."import_id" as "import_id",
      'advance' as "type",
      "expenses_advances"."date_needed" as "date",
      "expenses_advances"."user_id" as "user_id",
      "expenses_advances"."project_id",
      "expenses_projects"."tax_project_id",
      "expenses_advances"."expense_type_id",
      "expenses_advances"."description",
      null as "account_number",
      null as "invoice_number",
      null as "vendor_id",
      null as "total",
      null as "tax_total",
      "expenses_advances"."amount",
      null as "tax",
      null as "account_id",
      "expenses_advances"."status_id",
      "expenses_advances"."batch_id",
      "expenses_advances"."created_at"
      from "expenses_advances"
      left join "expenses_projects" on "expenses_projects"."id" = "expenses_advances"."project_id"
      left join "maha_import_items" on "maha_import_items"."object_id" = "expenses_advances"."id"
      left join "maha_imports" on "maha_imports"."id" = "maha_import_items"."import_id" and "maha_imports"."object_type" = 'expenses_advances'
      union
      select "expenses_expenses"."code",
      "expenses_expenses"."id" as "item_id",
      "expenses_expenses"."team_id",
      "maha_import_items"."import_id" as "import_id",
      'expense' as "type",
      "expenses_expenses"."date",
      "expenses_expenses"."user_id" as "user_id",
      "expenses_expenses"."project_id",
      "expenses_projects"."tax_project_id",
      "expenses_expenses"."expense_type_id",
      "expenses_expenses"."description",
      null as "account_number",
      null as "invoice_number",
      "expenses_expenses"."vendor_id",
      "expenses_expenses"."total",
      "expenses_expenses"."tax_total",
      "expenses_expenses"."amount",
      "expenses_expenses"."tax",
      "expenses_expenses"."account_id",
      "expenses_expenses"."status_id",
      "expenses_expenses"."batch_id",
      "expenses_expenses"."created_at"
      from "expenses_expenses"
      left join "expenses_projects" on "expenses_projects"."id" = "expenses_expenses"."project_id"
      left join "maha_import_items" on "maha_import_items"."object_id" = "expenses_expenses"."id"
      left join "maha_imports" on "maha_imports"."id" = "maha_import_items"."import_id" and "maha_imports"."object_type" = 'expenses_expenses'
      union
      select null as "code",
      "expenses_trips"."id" as "item_id",
      "expenses_trips"."team_id",
      "maha_import_items"."import_id" as "import_id",
      'trip' as "type",
      "expenses_trips"."date",
      "expenses_trips"."user_id" as "user_id",
      "expenses_trips"."project_id",
      "expenses_projects"."tax_project_id",
      "expenses_trips"."expense_type_id",
      "expenses_trips"."description",
      null as "account_number",
      null as "invoice_number",
      null as "vendor_id",
      null as "total",
      null as "tax_total",
      "expenses_trips"."amount",
      null as "tax",
      null as "account_id",
      "expenses_trips"."status_id",
      "expenses_trips"."batch_id",
      "expenses_trips"."created_at"
      from "expenses_trips"
      left join "expenses_projects" on "expenses_projects"."id" = "expenses_trips"."project_id"
      left join "maha_import_items" on "maha_import_items"."object_id" = "expenses_trips"."id"
      left join "maha_imports" on "maha_imports"."id" = "maha_import_items"."import_id" and "maha_imports"."object_type" = 'expenses_trips'
      union
      select "expenses_checks"."code",
      "expenses_checks"."id" as "item_id",
      "expenses_checks"."team_id",
      "maha_import_items"."import_id" as "import_id",
      'check' as "type",
      "expenses_checks"."date_needed" as "date",
      "expenses_checks"."user_id" as "user_id",
      "expenses_checks"."project_id",
      "expenses_projects"."tax_project_id",
      "expenses_checks"."expense_type_id",
      "expenses_checks"."description",
      "expenses_checks"."account_number",
      "expenses_checks"."invoice_number",
      "expenses_checks"."vendor_id",
      "expenses_checks"."total",
      "expenses_checks"."tax_total",
      "expenses_checks"."amount",
      "expenses_checks"."tax",
      null as "account_id",
      "expenses_checks"."status_id",
      "expenses_checks"."batch_id",
      "expenses_checks"."created_at"
      from "expenses_checks"
      left join "expenses_projects" on "expenses_projects"."id" = "expenses_checks"."project_id"
      left join "maha_import_items" on "maha_import_items"."object_id" = "expenses_checks"."id"
      left join "maha_imports" on "maha_imports"."id" = "maha_import_items"."import_id" and "maha_imports"."object_type" = 'expenses_checks'
      union
      select "expenses_reimbursements"."code",
      "expenses_reimbursements"."id" as "item_id",
      "expenses_reimbursements"."team_id",
      "maha_import_items"."import_id" as "import_id",
      'reimbursement' as "type",
      "expenses_reimbursements"."date",
      "expenses_reimbursements"."user_id" as "user_id",
      "expenses_reimbursements"."project_id",
      "expenses_projects"."tax_project_id",
      "expenses_reimbursements"."expense_type_id",
      "expenses_reimbursements"."description",
      null as "account_number",
      null as "invoice_number",
      "expenses_reimbursements"."vendor_id",
      "expenses_reimbursements"."total",
      null as "tax_total",
      "expenses_reimbursements"."amount",
      null as "tax",
      null as "account_id",
      "expenses_reimbursements"."status_id",
      "expenses_reimbursements"."batch_id",
      "expenses_reimbursements"."created_at"
      from "expenses_reimbursements"
      left join "expenses_projects" on "expenses_projects"."id" = "expenses_reimbursements"."project_id"
      left join "maha_import_items" on "maha_import_items"."object_id" = "expenses_reimbursements"."id"
      left join "maha_imports" on "maha_imports"."id" = "maha_import_items"."import_id" and "maha_imports"."object_type" = 'expenses_reimbursements'
      ) as "items"
    `)

  },

  down: async (knex) => {
  }

}

export default AddItemCode
