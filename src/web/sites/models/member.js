import bcrypt from 'bcrypt-nodejs'
import { Model } from 'maha'
import Site from './site'

const Member = new Model({

  tableName: 'sites_members',

  rules: {},

  virtuals: {

    full_name: function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    },

    password: {
      get() {},
      set(value) {
        const password_salt = bcrypt.genSaltSync(10)
        this.set('password_salt', password_salt)
        this.set('password_hash', bcrypt.hashSync(value, password_salt))
      }
    },

    rfc822: function() {
      return `${this.get('full_name')} <${this.get('email')}>`
    }

  },

  authenticate(password) {
    return this.get('password_hash') === bcrypt.hashSync(password, this.get('password_salt'))
  },

  site: function() {
    return this.belongsTo(Site, 'site_id')
  }

})

export default Member
