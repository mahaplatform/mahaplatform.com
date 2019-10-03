import Model from '../../../web/core/objects/model'

const Story = new Model({

  tableName: 'maha_stories',

  hasTimestamps: [],

  belongsToTeam: false,

  rules: {
    text: 'required'
  }

})

export default Story
