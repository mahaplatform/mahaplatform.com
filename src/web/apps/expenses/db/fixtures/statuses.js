import Fixtures from '../../../../core/objects/fixtures'

const statusesFixtures = new Fixtures({

  tableName: 'expenses_statuses',

  records: {

    incomplete: (data) => ({
      text: 'incomplete'
    }),

    pending: (data) => ({
      text: 'pending'
    }),

    submitted: (data) => ({
      text: 'submitted'
    }),

    approved: (data) => ({
      text: 'approved'
    }),

    rejected: (data) => ({
      text: 'rejected'
    }),

    reviewed: (data) => ({
      text: 'reviewed'
    }),

    processed: (data) => ({
      text: 'processed'
    })

  }

})

export default statusesFixtures
