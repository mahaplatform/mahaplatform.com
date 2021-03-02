import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const EmailLink = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_email_links'

})

export default EmailLink
