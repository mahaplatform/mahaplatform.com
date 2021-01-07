import generateCode from '@core/utils/generate_code'

const AddItemCodes = {

  databaseName: 'maha',

  up: async (knex) => {

    await Promise.mapSeries(['advances','trips'], async (model) => {

      await knex.schema.table(`finance_${model}`, (table) => {
        table.string('code')
      })

      const items = await knex(`finance_${model}`)

      await Promise.mapSeries(items, async (item) => {

        const code = await generateCode({
          trx: knex
        }, {
          table: 'finance_items'
        })

        await knex(`finance_${model}`).where({
          id: item.id
        }).update({
          code
        })

      })

    })

    await knex.raw('drop view finance_items')

    await knex.raw(`
      create view finance_items AS
      select row_number() over (order by "items"."type", "items"."item_id") as id,
      "items".*
      from (
      select "finance_advances"."code",
      "finance_advances"."id" as "item_id",
      "finance_advances"."team_id",
      "maha_imports_import_items"."import_id",
      'advance' as "type",
      "finance_advances"."date_needed" as "date",
      "finance_advances"."user_id" as "user_id",
      "finance_advances"."project_id",
      "finance_projects"."tax_project_id",
      "finance_advances"."expense_type_id",
      "finance_advances"."description",
      null as "account_number",
      null as "invoice_number",
      null as "vendor_id",
      null as "total",
      null as "tax_total",
      "finance_advances"."amount",
      null as "tax",
      null as "account_id",
      cast("finance_advances"."status" as varchar),
      "finance_advances"."batch_id",
      "finance_advances"."created_at"
      from "finance_advances"
      left join "finance_projects" on "finance_projects"."id" = "finance_advances"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_advances"."id" and "maha_imports_import_items"."object_type" = 'finance_advances'
      union
      select "finance_expenses"."code",
      "finance_expenses"."id" as "item_id",
      "finance_expenses"."team_id",
      "maha_imports_import_items"."import_id",
      'expense' as "type",
      "finance_expenses"."date",
      "finance_expenses"."user_id" as "user_id",
      "finance_expenses"."project_id",
      "finance_projects"."tax_project_id",
      "finance_expenses"."expense_type_id",
      "finance_expenses"."description",
      null as "account_number",
      null as "invoice_number",
      "finance_expenses"."vendor_id",
      "finance_expenses"."total",
      "finance_expenses"."tax_total",
      "finance_expenses"."amount",
      "finance_expenses"."tax",
      "finance_expenses"."account_id",
      cast("finance_expenses"."status" as varchar),
      "finance_expenses"."batch_id",
      "finance_expenses"."created_at"
      from "finance_expenses"
      left join "finance_projects" on "finance_projects"."id" = "finance_expenses"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_expenses"."id" and "maha_imports_import_items"."object_type" = 'finance_expenses'
      union
      select "finance_trips"."code",
      "finance_trips"."id" as "item_id",
      "finance_trips"."team_id",
      "maha_imports_import_items"."import_id",
      'trip' as "type",
      "finance_trips"."date",
      "finance_trips"."user_id" as "user_id",
      "finance_trips"."project_id",
      "finance_projects"."tax_project_id",
      "finance_trips"."expense_type_id",
      "finance_trips"."description",
      null as "account_number",
      null as "invoice_number",
      null as "vendor_id",
      null as "total",
      null as "tax_total",
      "finance_trips"."amount",
      null as "tax",
      null as "account_id",
      cast("finance_trips"."status" as varchar),
      "finance_trips"."batch_id",
      "finance_trips"."created_at"
      from "finance_trips"
      left join "finance_projects" on "finance_projects"."id" = "finance_trips"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_trips"."id" and "maha_imports_import_items"."object_type" = 'finance_trips'
      union
      select "finance_checks"."code",
      "finance_checks"."id" as "item_id",
      "finance_checks"."team_id",
      "maha_imports_import_items"."import_id",
      'check' as "type",
      "finance_checks"."date_needed" as "date",
      "finance_checks"."user_id" as "user_id",
      "finance_checks"."project_id",
      "finance_projects"."tax_project_id",
      "finance_checks"."expense_type_id",
      "finance_checks"."description",
      "finance_checks"."account_number",
      "finance_checks"."invoice_number",
      "finance_checks"."vendor_id",
      "finance_checks"."total",
      "finance_checks"."tax_total",
      "finance_checks"."amount",
      "finance_checks"."tax",
      null as "account_id",
      cast("finance_checks"."status" as varchar),
      "finance_checks"."batch_id",
      "finance_checks"."created_at"
      from "finance_checks"
      left join "finance_projects" on "finance_projects"."id" = "finance_checks"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_checks"."id" and "maha_imports_import_items"."object_type" = 'finance_checks'
      union
      select "finance_reimbursements"."code",
      "finance_reimbursements"."id" as "item_id",
      "finance_reimbursements"."team_id",
      "maha_imports_import_items"."import_id",
      'reimbursement' as "type",
      "finance_reimbursements"."date",
      "finance_reimbursements"."user_id" as "user_id",
      "finance_reimbursements"."project_id",
      "finance_projects"."tax_project_id",
      "finance_reimbursements"."expense_type_id",
      "finance_reimbursements"."description",
      null as "account_number",
      null as "invoice_number",
      "finance_reimbursements"."vendor_id",
      "finance_reimbursements"."total",
      null as "tax_total",
      "finance_reimbursements"."amount",
      null as "tax",
      null as "account_id",
      cast("finance_reimbursements"."status" as varchar),
      "finance_reimbursements"."batch_id",
      "finance_reimbursements"."created_at"
      from "finance_reimbursements"
      left join "finance_projects" on "finance_projects"."id" = "finance_reimbursements"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_reimbursements"."id" and "maha_imports_import_items"."object_type" = 'finance_reimbursements'
      ) as "items"
    `)

  },

  down: async (knex) => {
  }

}

export default AddItemCodes
