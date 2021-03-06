const CreateRecord = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('alter type websites_dns_statuses add value \'inprogress\'')

    await knex.schema.table('websites_domains', (table) => {
      table.dropColumn('aws_registration_id')
      table.dropColumn('aws_transfer_id')
      table.dropColumn('is_system')
      table.dropColumn('duration')
      table.dropColumn('config')
      table.dropColumn('auth_code')
      table.dropColumn('admin_contact')
      table.dropColumn('registrant_contact')
      table.dropColumn('tech_contact')
      table.string('aws_operation_id')
    })

    await knex('websites_domains').whereIn('id', [1,2]).delete()

    await knex.schema.table('websites_websites', (table) => {
      table.string('slug')
    })

    await knex('websites_websites').where('id', 1).update({
      slug: 'cce-tompkins-ccetompkins'
    })

    await knex('websites_websites').where('id', 2).update({
      slug: 'cce-tompkins-2-ccetompkins'
    })
  },

  down: async (knex) => {}

}

export default CreateRecord
