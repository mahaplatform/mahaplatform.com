const AddIsEmpty = {

  up: async (knex) => {

    await knex.schema.table('maha_import_items', (table) => {
      table.boolean('is_empty')
    })

    await knex('maha_import_items').update({
      is_empty: false
    })

    await knex.raw('drop view maha_import_counts')

    await knex.raw(`
      create view maha_import_counts AS
      with items as (
      select import_id,
      count(*) as total
      from maha_import_items
      group by import_id
      ),
      empty as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_empty=true
      group by import_id
      ),
      valid as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_valid=true
      and is_duplicate=false
      and is_nonunique=false
      and is_empty=false
      group by import_id
      ),
      errors as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_valid=false
      and is_omitted=false
      and is_empty=false
      group by import_id
      ),
      omitted as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_valid=false
      and is_omitted=true
      and is_empty=false
      group by import_id
      ),
      dupicates as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_valid=true
      and is_duplicate=true
      and is_empty=false
      group by import_id
      ),
      nonunique as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_nonunique=true
      and is_empty=false
      group by import_id
      ),
      completed as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_complete=true
      and is_empty=false
      group by import_id
      ),
      created as (
      select import_id,
      count(*) as total
      from maha_import_items
      where object_id is not null
      and is_merged=false
      and is_ignored=false
      and is_empty=false
      group by import_id
      ),
      merged as (
      select import_id,
      count(*) as total
      from maha_import_items
      where object_id is not null
      and is_merged=true
      and is_ignored=false
      and is_empty=false
      group by import_id
      ),
      ignored as (
      select import_id,
      count(*) as total
      from maha_import_items
      where is_ignored=true
      and is_empty=false
      group by import_id
      )
      select maha_imports.id as import_id,
      cast(coalesce(items.total, 0) as integer) as item_count,
      cast(coalesce(valid.total, 0) as integer) as valid_count,
      cast(coalesce(errors.total, 0) as integer) as error_count,
      cast(coalesce(omitted.total, 0) as integer) as omit_count,
      cast(coalesce(dupicates.total, 0) as integer) as duplicate_count,
      cast(coalesce(nonunique.total, 0) as integer) as nonunique_count,
      cast(coalesce(completed.total, 0) as integer) as completed_count,
      cast(coalesce(created.total, 0) as integer) as created_count,
      cast(coalesce(merged.total, 0) as integer) as merged_count,
      cast(coalesce(ignored.total, 0) as integer) as ignored_count,
      cast(coalesce(empty.total, 0) as integer) as empty_count
      from maha_imports
      left join items on items.import_id=maha_imports.id
      left join created on created.import_id=maha_imports.id
      left join merged on merged.import_id=maha_imports.id
      left join ignored on ignored.import_id=maha_imports.id
      left join valid on valid.import_id=maha_imports.id
      left join errors on errors.import_id=maha_imports.id
      left join omitted on omitted.import_id=maha_imports.id
      left join dupicates on dupicates.import_id=maha_imports.id
      left join nonunique on nonunique.import_id=maha_imports.id
      left join completed on completed.import_id=maha_imports.id
      left join empty on empty.import_id=maha_imports.id
    `)

  },

  down: async (knex) => {
  }

}

export default AddIsEmpty
