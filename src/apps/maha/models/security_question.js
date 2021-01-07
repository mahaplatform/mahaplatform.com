import Model from '@core/objects/model'

const SecurityQuestion = new Model({

  databaseName: 'maha',

  belongsToTeam: false,

  tableName: 'maha_security_questions',

  rules: {
    text: ['required']
  }

})

export default SecurityQuestion
