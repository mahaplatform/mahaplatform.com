import Email from '@apps/maha/models/email'
import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Announcement = new Model(knex, {

  databaseName: 'maha',

  belongsToTeam: false,

  tableName: 'maha_announcements',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return 'announcement'
    },

    object_url: function() {
      return `/platforms/announcement/${this.get('id')}`
    },

    editable() {
      return this.get('deleted_at') === null
    },

    preview() {
      return this.get('screenshoted_at') ? `screenshots/announcements-${this.get('id')}-${this.get('screenshoted_at').getTime()}.jpg` : null
    }

  },

  emails() {
    return this.hasMany(Email, 'announcement_id')
  }

})

export default Announcement
