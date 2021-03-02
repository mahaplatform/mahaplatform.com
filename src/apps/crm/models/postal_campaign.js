import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Program from './program'

const PostalCampaign = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_postal_campaigns',

  rules: {},

  virtuals: {},

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default PostalCampaign
