import { cron, User } from 'maha'

const Foo = cron({

  name: 'foo',

  schedule: "* * * * *",

  processor: async (trx) => {

    await User.query(qb => qb.select('id AS foo')).where({ id: 1 }).fetch({ transacting: trx })

  }

})

export default Foo
