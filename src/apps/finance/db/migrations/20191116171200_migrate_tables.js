const MigrateTables = {

  up: async (knex) => {

    const item_types = ['advances','checks','expenses','reimbursements','trips']

    const statuses = ['incomplete','pending','submitted','approved','rejected','reviewed','processed']

    const tables = ['accounts','advances','batches','checks','expenses','expense_types','members','projects','rates','receipts','reimbursements','trips','vendors']

    await knex('maha_apps').where({
      code: 'expenses'
    }).update({
      code: 'finance'
    })

    await knex.raw('drop view expenses_items')

    await knex.raw('drop view drive_items_access')

    await knex.raw('drop view crm_program_user_access')

    await knex.raw('drop view maha_groupings_users')

    await Promise.mapSeries(item_types, async(type) => {

      const items = await knex(`expenses_${type}`)

      await knex.schema.table(`expenses_${type}`, (table) => {
        table.enum('status', statuses, { useNative: true, enumName: `expenses_${type}_status` })
      })

      await Promise.mapSeries(items, async(item) => {
        await knex(`expenses_${type}`).where({
          id: item.id
        }).update({
          status: statuses[item.status_id - 1]
        })
      })

      await knex.schema.table(`expenses_${type}`, (table) => {
        table.dropColumn('status_id')
      })

    })

    await knex.schema.dropTable('expenses_statuses')

    const members = await knex('expenses_members')

    await knex.schema.table('expenses_members', (table) => {
      table.enum('type', ['owner','approver','member'], { useNative: true, enumName: 'expenses_members_type' })
    })

    const types = ['owner','approver','member']

    await Promise.mapSeries(members, async(member) => {
      await knex('expenses_members').where({
        id: member.id
      }).update({
        type: types[member.member_type_id - 1]
      })
    })

    await knex.schema.table('expenses_members', (table) => {
      table.dropColumn('member_type_id')
    })

    await knex.schema.dropTable('expenses_member_types')

    await Promise.mapSeries(tables, async(table) => {
      await knex.schema.renameTable(`expenses_${table}`, `finance_${table}`)
    })

    await knex.raw(`
      create view maha_groupings_users AS
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_groupings on maha_groupings.id=1
      union
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_supervisors on maha_supervisors.user_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=2
      union
      select maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_supervisors on maha_supervisors.user_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=2
      union
      select distinct on (maha_users.id) maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join maha_groups on maha_groups.leader_id=maha_users.id
      inner join maha_groupings on maha_groupings.id=3
      union
      select distinct on (maha_users.id) maha_users.team_id,maha_groupings.id as grouping_id,maha_users.id as user_id
      from maha_users
      inner join finance_members on finance_members.user_id=maha_users.id and finance_members.type != 'member'
      inner join maha_groupings on maha_groupings.id=4
    `)

    await knex.raw(`
      create view crm_program_user_access AS
      select distinct on (accesses.program_id, accesses.user_id) accesses.program_id,
      accesses.user_id,
      accesses.type
      from (
      select crm_programs.id as program_id,
      maha_users.id as user_id,
      'manage' as type
      from crm_programs, maha_users
      inner join maha_users_roles on maha_users_roles.user_id = maha_users.id
      inner join maha_roles_rights on maha_roles_rights.role_id = maha_users_roles.role_id
      inner join maha_rights on maha_rights.id = maha_roles_rights.right_id and maha_rights.code='manage_all_programs'
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_groupings_users on maha_groupings_users.grouping_id = crm_program_accesses.grouping_id
      inner join maha_users on maha_users.id = maha_groupings_users.user_id
      union
      select crm_program_accesses.program_id,
      maha_users_groups.user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_users_groups on maha_users_groups.group_id = crm_program_accesses.group_id
      union
      select crm_program_accesses.program_id,
      maha_users.id as user_id,
      crm_program_accesses.type
      from crm_program_accesses
      inner join maha_users on maha_users.id = crm_program_accesses.user_id
      ) accesses
      order by accesses.program_id, accesses.user_id, accesses.type
    `)

    await knex.raw(`
      create view drive_items_access AS
      select distinct on (code, user_id) code, user_id, access_type_id
      from(
      select drive_access.code, maha_users.id as user_id, drive_access.access_type_id
      from drive_access
      inner join maha_groupings_users on maha_groupings_users.grouping_id=drive_access.grouping_id
      inner join maha_users on maha_users.id=maha_groupings_users.user_id
      union
      select drive_access.code, maha_users_groups.user_id, drive_access.access_type_id
      from drive_access
      inner join maha_users_groups on maha_users_groups.group_id=drive_access.group_id
      union
      select drive_access.code, maha_users.id as user_id, drive_access.access_type_id
      from drive_access
      inner join maha_users on maha_users.id=drive_access.user_id
      ) as "accesses"
      order by code, user_id, access_type_id
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

  },

  down: async (knex) => {
  }

}

export default MigrateTables
