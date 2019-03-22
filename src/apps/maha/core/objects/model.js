import bookshelf from '../services/bookshelf'
import '../validations/later_than_validation'
import '../validations/datestring_validation'
import '../validations/currency_validation'
import '../validations/greater_than_field_validation'
import '../validations/time_validation'
import '../validations/unique_validation'
import Checkit from  'checkit'
import _ from 'lodash'

class Model {

  constructor(options) {

    return bookshelf.Model.extend({

      hasTimestamps: options.hasTimestamps !== false,

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
          ...(options.belongsToTeam !== false ? { team_id: 'required' } : {})
        } : {}

        return new Checkit(rules).run(this.attributes, { tableName: this.tableName })

      },

      activities: function() {

        const Activity = require('../../models/activity').default

        return this.morphMany(Activity, 'activable', ['object_table', 'object_id'])

      },

      audit: function() {

        const Audit = require('../../models/audit').default

        return this.morphMany(Audit, 'auditable')

      },

      comments: function() {

        const Comment = require('../../models/comment').default

        return this.morphMany(Comment, 'commentable')

      },

      listenings: function() {

        const Listening = require('../../models/listening').default

        return this.morphMany(Listening, 'listenable')

      },

      reviews: function() {

        const Review = require('../../models/review').default

        return this.morphMany(Review, 'reviewable')

      },

      reactions: function() {

        const Reaction = require('../../models/reaction').default

        return this.morphMany(Reaction, 'reactable').query(qb => {

          qb.whereNull('unreacted_at')

        })

      },

      stars: function() {

        const Star = require('../../models/star').default

        return this.morphMany(Star, 'starrable')

      },

      team: function() {

        const Team = require('../../models/team').default

        return this.belongsTo(Team, 'team_id')

      },

      ...options

    })

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
