import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const CertificateDomain = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_certificate_domains',

  rules: {},

  virtuals: {}

})

export default CertificateDomain
