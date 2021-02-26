const AddUserToVersions = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_versions', (table) => {
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
    })

    const versions = await knex('maha_versions')

    await Promise.mapSeries(versions, async (version) => {

      const audit = await knex('maha_audits').where({
        auditable_type: version.versionable_type,
        auditable_id: version.versionable_id
      }).orderBy('id', 'desc').then(results => results[0])

      await knex('maha_versions').where('id', version.id).update({
        user_id: audit.user_id
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddUserToVersions
