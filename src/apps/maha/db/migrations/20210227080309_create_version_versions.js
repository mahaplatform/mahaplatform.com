const CreateVersionVersions = {

  databaseName: 'maha',

  up: async (knex) => {

    knex.schema.alterTable('maha_versions', function(table) {
      table.index(['versionable_type','versionable_id','key'])
    })

    await knex.raw(`
    create view maha_version_versions as
    with
    ordered as (
    select *
    from maha_versions
    order by created_at desc
    ),
    versions as (
    select distinct on (versionable_type, versionable_id, key) *
    from ordered
    ),
    draft as (
    select distinct on (versionable_type,versionable_id, key) *
    from ordered
    where unpublished_at is null
    ),
    last_published as (
    select distinct on (versionable_type,versionable_id, key) *
    from ordered
    where published_at is not null
    ),
    published as (
    select distinct on (versionable_type,versionable_id, key) *
    from ordered
    where published_at is not null
    and unpublished_at is null
    )
    select versions.versionable_type,
    versions.versionable_id,
    versions.key,
    versions.id as active_id,
    versions.value as active_value,
    draft.id as draft_id,
    draft.value as draft_value,
    published.id as published_id,
    published.value as published_value,
    case
    when draft.id is null then 'archived'
    when published.id != draft.id then 'changed'
    when published.id = draft.id then 'published'
    else 'draft'
    end as status
    from versions
    left join draft on draft.versionable_type=versions.versionable_type and draft.versionable_id=versions.versionable_id and versions.key=draft.key
    left join last_published on last_published.versionable_type=versions.versionable_type and last_published.versionable_id=versions.versionable_id and last_published.key=versions.key
    left join published on published.versionable_type=versions.versionable_type and published.versionable_id=versions.versionable_id and published.key=versions.key
    `)
  },

  down: async (knex) => {
  }

}

export default CreateVersionVersions
