import { Fixtures } from 'maha'

const memberTypesFixtures = new Fixtures({

  tableName: 'expenses_member_types',

  records: {

    owner: (data) => ({
      name: 'Owner',
      description: 'Can add their own expense items and approve expense items for other owners, approvers and members'
    }),

    approver: (data) => ({
      name: 'Approver',
      description: 'Can add their own expense items and approve expense items for owners, other approvers, and members'
    }),

    member: (data) => ({
      name: 'Member',
      description: 'Can add their own expense items'
    })

  }

})

export default memberTypesFixtures
