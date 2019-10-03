import collectObjects from '../../../web/core/utils/collect_objects'
import Model from '../../../web/core/objects/model'
import Role from './role'
import _ from 'lodash'

let data = null

const getData = () => {
  if(data) return data
  data = collectObjects('app.js').reduce((apps, app) => [
    ...apps,
    app.default
  ], [])
  return data
}

const App = new Model({

  tableName: 'maha_apps',

  rules: {
    title: ['required', 'unique']
  },

  virtuals: {

    data: function() {
      return _.find(getData(), {
        code: this.get('code')
      })
    },

    object_text: function() {
      return this.get('data').title
    },

    object_type: function() {
      return 'app'
    },

    object_url: function() {
      return `/admin/team/apps/${this.get('id')}`
    }

  },

  roles() {
    return this.belongsToMany(Role, 'maha_roles_apps', 'role_id', 'app_id')
  }

})

export default App
