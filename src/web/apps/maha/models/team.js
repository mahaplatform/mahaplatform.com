import Model from '../../../core/objects/model'
import Strategy from './strategy'
import Domain from './domain'
import Asset from './asset'
import App from './app'

const Team = new Model({

  tableName: 'maha_teams',

  belongsToTeam: false,

  withRelated: ['logo','strategies'],

  rules: {
    title: ['required', 'unique'],
    subdomain: ['required', 'unique']
  },

  virtuals: {

    app_ids: function() {
      return this.related('apps').map(app => app.id)
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
  },

  strategies() {
    return this.hasMany(Strategy, 'team_id')
  }

})

export default Team
