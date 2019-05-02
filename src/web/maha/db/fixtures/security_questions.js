import Fixtures from '../../core/objects/fixtures'

const securityQuestionsFixtures = new Fixtures({

  tableName: 'maha_security_questions',

  records: {

    first_pet: (data) => ({
      text: 'What is the name of your first pet?'
    }),

    maiden_name: (data) => ({
      text: 'What is your mother\'s maiden name?'
    }),

    grandfather: (data) => ({
      text: 'What is the first name of your maternal grandfather?'
    }),

    youngest_sbling: (data) => ({
      text: 'What is the first name of your youngest subling?'
    }),

    birth_city: (data) => ({
      text: 'In what city were you born?'
    })

  }

})

export default securityQuestionsFixtures
