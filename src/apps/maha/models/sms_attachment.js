import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import Asset from './asset'
import SMS from './sms'

const SmsAttachment = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_sms_attachments',

  rules: {},

  virtuals: {},

  asset() {
    return this.belongsTo(Asset, 'asset_id')
  },

  sms() {
    return this.belongsTo(SMS, 'sms_id')
  }

})

export default SmsAttachment
