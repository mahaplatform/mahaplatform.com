import Model from '../../../core/objects/model'
import App from './app'

const HelpArticle = new Model({

  tableName: 'maha_help_articles',

  rules: {},

  virtuals: {},

  app() {
    return this.belongsTo(App, 'app_id')
  }

})

export default HelpArticle
