import { cron, User } from 'maha'

const Bar = cron({

  name: 'bar',

  schedule: "* * * * *",

  processor: async (trx) => {

    await User.query(qb => qb.select('id AS bar')).where({ id: 1 }).fetch({ transacting: trx })

  }

})

export default Bar
