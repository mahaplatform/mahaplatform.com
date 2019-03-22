import Fixtures from '../../core/objects/fixtures'

const securityQuestionsFixtures = new Fixtures({

  tableName: 'maha_security_questions',

  records: {

    grandfather: (data) => ({
      text: 'What is the first name of your maternal grandfather?'
    }),

    elementary_school: (data) => ({
      text: 'What is the name of your elementary school?'
    }),

    favorite_teacher: (data) => ({
      text: 'What is the last name of your favorite teacher?'
    }),

    birth_city: (data) => ({
      text: 'In what city were you born?'
    }),

    kissed: (data) => ({
      text: 'What is the first name of the person you first kissed?'
    })

  }

})

export default securityQuestionsFixtures
