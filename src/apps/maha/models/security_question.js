import Model from '../../../web/core/objects/model'

const SecurityQuestion = new Model({

  belongsToTeam: false,

  tableName: 'maha_security_questions',

  rules: {
    text: ['required']
  }

})

export default SecurityQuestion
