import Model from '../../../core/objects/model'
import Domain from './domain'
import Asset from './asset'
import App from './app'

const Team = new Model({

  tableName: 'maha_teams',

  belongsToTeam: false,

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique'],
    authentication_strategy: ['required']
  },

  virtuals: {

    app_ids: function() {
      return this.related('apps').map(app => app.id)
    },

    fqdn: function() {
      return `${this.get('subdomain')}.${process.env.DOMAIN}`
    },

    origin: function() {
      return `https://${this.get('fqdn')}`
    },

    rfc822: function() {
      return `${this.get('title')} <${this.get('subdomain')}@${this.get('fqdn')}>`
    }

  },

  apps() {
    return this.belongsToMany(App, 'maha_teams_apps', 'team_id', 'app_id')
  },

  domains() {
    return this.hasMany(Domain, 'team_id')
  },

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  }

})

export default Team
