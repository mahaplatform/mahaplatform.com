const UpdateEnums = {

  up: async (knex) => {

    await knex.raw('drop view finance_items')

    await knex.raw('drop view maha_imports_import_items')

    await knex.raw('alter type expenses_advances_status rename to finance_advances_status')

    await knex.raw('alter type expenses_checks_status rename to finance_checks_status')

    await knex.raw('alter type expenses_expenses_status rename to finance_expenses_status')

    await knex.raw('alter type expenses_members_type rename to finance_members_type')

    await knex.raw('alter type expenses_reimbursements_status rename to finance_reimbursements_status')

    await knex.raw('alter type expenses_trips_status rename to finance_trips_status')

    const mappings = [
      { table: 'crm_lists', column: 'type',  options: ['static','smart'] },
      { table: 'finance_projects', column: 'type',  options: ['basic','tax'] },
      { table: 'maha_assets', column: 'status',  options: ['chunked','assembled','processed'] },
      { table: 'maha_imports', column: 'stage', options: ['previewing','mapping','configuring','parsing','validating','processing','finalizing','complete'] },
      { table: 'maha_imports', column: 'strategy', options: ['ignore','overwrite','discard','create'] },
      { table: 'maha_import_items', column: 'result', options: ['created','merged','ignored'] },
      { table: 'maha_reactions', column: 'type', options: ['thumbsup','thumbsdown','smile','cry','rage','heart'] },
      { table: 'maha_users', column: 'email_notifications_method', options: ['none','ondemand', 'digest'] },
      { table: 'maha_users', column: 'notification_sound', options: ['ding','boing','drop','tada','plink','wow','here_you_go','hi','knock_brush','whoah','yoink'] },
      { table: 'maha_devices', column: 'icon', options: ['apple','windows','android','chrome','firefox','edge','explorer','safari'] },
      { table: 'maha_fields', column: 'type', options: ['addressfield','checkbox','checkboxgroup','colorfield','datefield','emailfield','filefield','imagefield','lookup','moneyfield','numberfield','phonefield','radiogroup','section','textfield','textarea','timefield','urlfield','videofield','htmlfield'] },
      { table: 'sites_managers', column: 'role', options: ['administrator','contributor'] },
      { table: 'training_trainings', column: 'type', options: ['local','remote','online','maha'] }
    ]

    await Promise.mapSeries(mappings, async(mapping) => {

      const items = await knex(mapping.table)

      await knex.schema.table(mapping.table, (table) => {
        table.dropColumn(mapping.column)
      })

      await knex.schema.table(mapping.table, (table) => {
        table.enum(mapping.column, mapping.options, { useNative: 'true', enumName: `${mapping.table}_${mapping.column}` })
      })

      await Promise.mapSeries(items, async(item) => {
        await knex(mapping.table).where({
          id: item.id
        }).update({
          [mapping.column]: item[mapping.column]
        })
      })

    })

    await knex.raw(`
      create view maha_imports_import_items AS
      select maha_import_items.*, maha_imports.object_type
      from maha_import_items
      inner join maha_imports on maha_imports.id=maha_import_items.import_id
    `)


    await knex.raw(`
      create or replace VIEW finance_items AS
      select row_number() over (order by "items"."type", "items"."item_id") as id,
      "items".*
      from (
      select null as "code",
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
      select null as "code",
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

    await knex.raw('drop type undefined')

    await knex.raw('drop type crm_lists_types')

  },

  down: async (knex) => {
  }

}

export default UpdateEnums
