import { Migration } from 'maha'
import { propagateAccess } from '../../services/items'
import Folder from '../../models/folder'

const UpdateAccessModel = new Migration({

  up: async (knex) => {

    const accesses = await knex('drive_access')
      .innerJoin('drive_access_types', 'drive_access_types.id', 'drive_access.access_type_id')
      .innerJoin('drive_folders', 'drive_folders.id', 'drive_access.folder_id')

    await knex.raw('drop view drive_items_accesses')

    await knex.raw('drop view drive_folders_accesses')

    await knex.raw('drop view drive_starred')

    await knex.raw('drop view drive_items')

    await knex.schema.dropTable('drive_access')

    await knex.schema.createTable('drive_access', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('code')
      table.boolean('is_everyone').defaultTo('false')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.integer('access_type_id').unsigned()
      table.foreign('access_type_id').references('drive_access_types.id')
    })

    await knex('drive_access').insert(accesses.map(access => ({
      team_id: access.team_id,
      code: access.code,
      is_everyone: access.group_id === 13,
      group_id: access.group_id === 13 ? null : access.group_id,
      user_id: access.user_id,
      access_type_id: access.access_type_id
    })))

    await knex('maha_users_groups').where({ group_id: 13 }).delete()

    await knex('maha_groups').where({ id: 13 }).delete()

    await knex.schema.table('drive_folders', (table) => {
      table.dropColumn('owner_id')
      table.index('code')
    })

    await knex.schema.table('drive_files', (table) => {
      table.dropColumn('owner_id')
      table.index('code')
    })

    await knex.schema.table('drive_access', (table) => {
      table.index('code')
    })

    await knex.raw(`
      create view drive_items AS
      select row_number() over (order by "items"."priority", "items"."label") as id,
      "items".*
      from (
      select
      0 as priority,
      "drive_folders"."code",
      "drive_folders"."id" as item_id,
      "drive_folders"."team_id",
      'folder' as type,
      "drive_folders"."parent_id" as "folder_id",
      null as "asset_id",
      "drive_folders"."label",
      "drive_folders"."deleted_at",
      "drive_folders"."created_at",
      "drive_folders"."updated_at"
      from "drive_folders"
      union
      select
      1 as priority,
      "drive_files"."code",
      "drive_files"."id" as item_id,
      "drive_files"."team_id",
      'file' as type,
      "drive_files"."folder_id",
      "drive_versions"."asset_id",
      "drive_files"."file_name" as "label",
      "drive_files"."deleted_at",
      "drive_files"."created_at",
      "drive_files"."updated_at"
      from "drive_files"
      inner join "drive_versions" on "drive_versions"."id" = "drive_files"."version_id"
      inner join "maha_assets" on "maha_assets"."id" = "drive_versions"."asset_id"
      ) as "items"
    `)

    await knex.raw(`
      create view drive_items_access AS
      select distinct on (drive_access.code, maha_users.id) drive_access.code, maha_users.id as user_id, drive_access.access_type_id
      from drive_access
      left join maha_users_groups on maha_users_groups.group_id=drive_access.group_id
      inner join maha_users on drive_access.is_everyone=true or maha_users.id=drive_access.user_id or maha_users.id=maha_users_groups.user_id
      order by drive_access.code, maha_users.id, drive_access.access_type_id
    `)

    await knex.raw(`
      create view drive_starred AS
      select "drive_items".*,
      "maha_stars"."user_id" as "starrer_id"
      from "drive_items"
      inner join "maha_stars" on "maha_stars"."starrable_type"=concat('drive_',"drive_items"."type",'s') and "maha_stars"."starrable_id"="drive_items"."item_id"
    `)

    const folders = await Folder.fetchAll({ transacting: knex })

    const sorted = folders.toArray().reduce((sorted, folder) => ({
      roots: [
        ...sorted.roots,
        ...folder.get('parent_id') === null ? [folder] : []
      ],
      nonroots: [
        ...sorted.nonroots,
        ...folder.get('parent_id') !== null ? [folder.get('code')] : []
      ]
    }), { roots: [], nonroots: [] })

    await knex('drive_access').whereIn('code', sorted.nonroots).delete()

    await Promise.mapSeries(sorted.roots, async folder => {

      await propagateAccess(folder, knex)

    })

  },

  down: async (knex) => {

    await knex.schema.table('drive_access', (table) => {
      table.dropColumn('is_everyone')
      table.dropColumn('access_type')
      table.integer('access_type_id').unsigned()
      table.foreign('access_type_id').references('drive_access_types.id')
    })

  }

})

export default UpdateAccessModel
