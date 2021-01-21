import Model from '@core/objects/model'
import Installation from './installation'
import Domain from './domain'
import Asset from './asset'
import App from './app'

const Team = new Model({

  databaseName: 'maha',

  tableName: 'maha_teams',

  belongsToTeam: false,

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique']
  },

  virtuals: {

    app_ids: function() {
      return this.related('apps').map(app => app.id)
    },

    fqdn: function() {
      const subdomain = process.env.NODE_ENV === 'production' ? `${this.get('subdomain')}.`: ''
      const domain = process.env.DOMAIN
      const port = process.env.NODE_ENV !== 'production' ? `:${process.env.DEVSERVER_PORT}`: ''
      return subdomain + domain + port
    },

    origin: function() {
      return `https://${this.get('fqdn')}`
    },

    email: function() {
      return `${this.get('subdomain')}@${process.env.DOMAIN}`
    },

    rfc822: function() {
      return `${this.get('title')} <${this.get('email')}>`
    }

  },

  apps() {
    return this.belongsToMany(App, 'maha_teams_apps', 'team_id', 'app_id')
  },

  domains() {
    return this.hasMany(Domain, 'team_id')
  },

  installations() {
    return this.hasMany(Installation, 'team_id')
  },

  logo() {
    return this.belongsTo(Asset, 'logo_id')
  }

})

export default Team
