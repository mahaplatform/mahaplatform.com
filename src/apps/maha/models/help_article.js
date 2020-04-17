import Model from '../../../core/objects/model'
import Asset from './asset'
import App from './app'

const HelpArticle = new Model({

  belongsToTeam: false,

  tableName: 'maha_help_articles',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'help article'
    },

    object_url: function() {
      return `/admin/platform/help/articles/${this.get('id')}`
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  desktop() {
    return this.belongsTo(Asset, 'desktop_id')
  },

  mobile() {
    return this.belongsTo(Asset, 'mobile_id')
  }

})

export default HelpArticle
