import Model from '@core/objects/model'

const Story = new Model({

  databaseName: 'maha',

  tableName: 'maha_stories',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

})

export default Story
