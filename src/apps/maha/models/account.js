import SecurityQuestion from './security_question'
import Model from '@core/objects/model'
import bcrypt from 'bcrypt-nodejs'
import Feature from './feature'
import Asset from './asset'
import User from './user'

const Account = new Model({

  belongsToTeam: false,

  tableName: 'maha_accounts',

  rules: {},

  virtuals: {

    authentication_strategy() {
      // if(process.env.NODE_ENV !== 'production') return 'local'
      const fqdn = this.get('email').split('@').pop()
      const domain = fqdn.split('.').slice(-2).join('.')
      if(domain === 'cornell.edu') return 'cornell'
      return 'local'
    },

    first_initial: function() {
      return this.get('first_name') ? this.get('first_name')[0].toLowerCase() : ''
    },

    full_name() {
      return this.get('first_name') + ' ' + this.get('last_name')
    },

    initials: function() {
      return this.get('first_initial') + this.get('last_initial')
    },

    last_initial: function() {
      return this.get('last_name') ? this.get('last_name')[0].toLowerCase() : ''
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

  features() {
    return this.belongsToMany(Feature, 'maha_accounts_features','account_id','feature_id')
  },

  photo() {
    return this.belongsTo(Asset, 'photo_id')
  },

  security_question() {
    return this.belongsTo(SecurityQuestion, 'security_question_id')
  },

  users() {
    return this.hasMany(User, 'account_id').query(qb => {
      qb.select('maha_users.*','maha_teams.title')
      qb.innerJoin('maha_teams', 'maha_teams.id', 'maha_users.team_id')
      qb.orderBy('maha_teams.title', 'asc')
    })
  }

})

export default Account
