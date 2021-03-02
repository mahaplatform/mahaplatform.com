import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Story = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_stories',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

})

export default Story
