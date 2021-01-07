const UpdateExpenseItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view finance_batch_totals')

    await knex.raw('drop view finance_admin_overview')

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
      null::time as "time_leaving",
      null::time as "time_arriving",
      null::numeric as "odometer_start",
      null::numeric as "odometer_end",
      null::numeric as "total_miles",
      "finance_advances"."batch_id",
      "finance_advances"."created_at",
      "finance_advances"."deleted_at"
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
      null::time as "time_leaving",
      null::time as "time_arriving",
      null::numeric as "odometer_start",
      null::numeric as "odometer_end",
      null::numeric as "total_miles",
      "finance_expenses"."batch_id",
      "finance_expenses"."created_at",
      "finance_expenses"."deleted_at"
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
      "finance_trips"."time_leaving",
      "finance_trips"."time_arriving",
      "finance_trips"."odometer_start",
      "finance_trips"."odometer_end",
      "finance_trips"."total_miles",
      "finance_trips"."batch_id",
      "finance_trips"."created_at",
      "finance_trips"."deleted_at"
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
      null::time as "time_leaving",
      null::time as "time_arriving",
      null::numeric as "odometer_start",
      null::numeric as "odometer_end",
      null::numeric as "total_miles",
      "finance_checks"."batch_id",
      "finance_checks"."created_at",
      "finance_checks"."deleted_at"
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
      null::time as "time_leaving",
      null::time as "time_arriving",
      null::numeric as "odometer_start",
      null::numeric as "odometer_end",
      null::numeric as "total_miles",
      "finance_reimbursements"."batch_id",
      "finance_reimbursements"."created_at",
      "finance_reimbursements"."deleted_at"
      from "finance_reimbursements"
      left join "finance_projects" on "finance_projects"."id" = "finance_reimbursements"."project_id"
      left join "maha_imports_import_items" on "maha_imports_import_items"."object_id" = "finance_reimbursements"."id" and "maha_imports_import_items"."object_type" = 'finance_reimbursements'
      ) as "items"
    `)

    await knex.raw(`
      create or replace view finance_batch_totals as
      select finance_batches.id as batch_id,
      count(finance_items.*) as items_count,
      sum(finance_items.amount) as total
      from finance_batches
      left join finance_items on finance_items.batch_id=finance_batches.id
      where finance_batches.type = 'expense'
      group by finance_batches.id
    `)

    await knex.raw(`
      create view finance_admin_overview as
      with physical_payments as (
        select count(*), team_id
        from finance_payments
        where status in ('received')
        and method in ('cash', 'check')
        group by team_id
      ),
      digital_payments_captured as (
        select count(*), team_id
        from finance_payments
        where status in ('captured')
        and method in ('ach','card','paypal','applepay','googlepay')
        group by team_id
      ),
      digital_payments_settled as (
        select count(*), team_id
        from finance_payments
        where status in ('settled')
        and method in ('ach','card','paypal','applepay','googlepay')
        group by team_id
      ),
      deposits as (
        select count(*), team_id
        from finance_deposits
        where status in ('pending')
        group by team_id
      ),
      expenses_approved as (
        select count(*), team_id
        from finance_items
        where deleted_at is null
        and status in ('approved')
        group by team_id
      ),
      expenses_reviewed as (
        select count(*), team_id
        from finance_items
        where deleted_at is null
        and status in ('reviewed')
        group by team_id
      )
      select maha_teams.id as team_id,
      coalesce(physical_payments.count, 0) as physical_payments_count,
      coalesce(digital_payments_captured.count, 0) as digital_payments_captured_count,
      coalesce(digital_payments_settled.count, 0) as digital_payments_settled_count,
      coalesce(deposits.count, 0) as deposits_count,
      coalesce(expenses_approved.count, 0) as expenses_approved_count,
      coalesce(expenses_reviewed.count, 0) as expenses_reviewed_count
      from maha_teams
      left join physical_payments on maha_teams.id=physical_payments.team_id
      left join digital_payments_captured on maha_teams.id=digital_payments_captured.team_id
      left join digital_payments_settled on maha_teams.id=digital_payments_settled.team_id
      left join deposits on maha_teams.id=deposits.team_id
      left join expenses_approved on maha_teams.id=expenses_approved.team_id
      left join expenses_reviewed on maha_teams.id=expenses_reviewed.team_id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateExpenseItems
