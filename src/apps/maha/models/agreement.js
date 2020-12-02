import Model from '../../../core/objects/model'
import Asset from './asset'

const Agreement = new Model({

  tableName: 'maha_agreements',

  rules: {},

  virtuals: {

    url() {
      return `https://secure.na4.adobesign.com/public/apiesign?pid=${this.get('adobe_signing_id')}&client_id=${process.env.ADOBE_SIGN_CLIENT_ID}`
    }

  },

  signed() {
    return this.belongsTo(Asset, 'signed_id')
  }

})

export default Agreement
