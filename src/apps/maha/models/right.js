import collectObjects from '../core/utils/collect_objects'
import Model from '../core/objects/model'
import Role from './role'
import App from './app'
import _ from 'lodash'

let data = null

const getData = () => {
  if(data) return data
  data = collectObjects('admin/rights.js').reduce((rights, right) => [
    ...rights,
    ...right.default.map(r => ({
      ...r,
      app: right.config.code
    }))
  ], [])
  return data
}

const Right = new Model({

  tableName: 'maha_rights',

  withRelated: 'app',

  rules: {
    text: 'required',
    app_id: 'required'
  },

  virtuals: {

    app_code: function() {
      return this.related('app').id ? this.related('app').get('code') : 'maha'
    },

    data: function() {
      return _.find(getData(), {
        code: this.get('code'),
        app: this.get('app_code')
      })
    }

  },

  app() {
    return this.belongsTo(App, 'app_id')
  },

  roles() {
    return this.belongsToMany(Role, 'maha_users_roles', 'user_id', 'role_id')
  }

})

export default Right
