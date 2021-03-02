import Asset from '@apps/maha/models/asset'
import Call from '@apps/maha/models/call'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Voicemail = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_voicemails',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  call() {
    return this.belongsTo(Call, 'call_id')
  }

})

export default Voicemail
