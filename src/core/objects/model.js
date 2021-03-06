import registry from '@core/utils/registry'
import Bookshelf from '@core/lib/bookshelf'
import Checkit from  'checkit'
import _ from 'lodash'

class Model {

  constructor(knex, options) {

    const bookshelf = Bookshelf(knex)

    const model = bookshelf.Model.extend({

      hasTimestamps: options.hasTimestamps !== false,

      belongsToTeam: options.databaseName === 'maha' && options.belongsToTeam !== false,

      tableName: '',

      rules: {},

      virtuals: {},

      initialize: function(attrs, opts) {
        this.on('saving', this.validateSave)
      },

      fetch: function(fetchOptions = {}) {
        return bookshelf.Model.prototype.fetch.call(this, mergeOptions(fetchOptions, options))
      },

      fetchAll: function(fetchOptions = {}) {
        return bookshelf.Model.prototype.fetchAll.call(this, mergeOptions(fetchOptions, options))
      },

      validateSave: function(model, attrs, saveOptions) {
        if(saveOptions.skipValidation) return true
        const rules = (this.belongsToTeam !== false) ? {
          ...(saveOptions.withRules || this.rules),
          ...(this.belongsToTeam !== false ? { team_id: 'required' } : {})
        } : {}
        return new Checkit(rules).run(this.attributes, {
          tableName: this.tableName
        })
      },

      activities: function() {
        const Activity = require('../../apps/maha/models/activity').default
        return this.morphMany(Activity, 'activable', ['object_table', 'object_id'])
      },

      audit: function() {
        const Audit = require('../../apps/maha/models/audit').default
        return this.morphMany(Audit, 'auditable').query(qb => {
          qb.orderBy('created_at', 'asc')
        })
      },

      comments: function() {
        const Comment = require('../../apps/maha/models/comment').default
        return this.morphMany(Comment, 'commentable').query(qb => {
          qb.whereNull('deleted_at')
        })
      },

      reactions: function() {
        const Reaction = require('../../apps/maha/models/reaction').default
        return this.morphMany(Reaction, 'reactable').query(qb => {
          qb.whereNull('unreacted_at')
        })
      },

      stars: function() {
        const Star = require('../../apps/maha/models/star').default
        return this.morphMany(Star, 'starrable')
      },

      team: function() {
        const Team = require('../../apps/maha/models/team').default
        return this.belongsTo(Team, 'team_id')
      },

      ...options

    })

    registry.register(options.tableName, model)

    return model

  }

}

const mergeOptions = (options, config) => ({
  ...options,
  withRelated: [
    ...coerceArray(options.withRelated),
    ...coerceArray(config.withRelated)
  ]
})


const coerceArray = (value) => !_.isNil(value) ? (!_.isArray(value) ? [value] : value) : []

export default Model
