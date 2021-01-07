import Deposit from '@apps/finance/models/deposit'

const MigrateDepositActivities = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('update finance_payments set status=\'deposited\' where status=\'disbursed\'')

    const deposits = await Deposit.fetchAll({
      transacting: knex
    })

    const story = await knex('maha_stories').insert({
      text: 'deposited'
    }).returning('*')

    await Promise.mapSeries(deposits, async (deposit) => {
      await knex('maha_audits').insert({
        team_id: deposit.get('team_id'),
        auditable_type: 'finance_deposits',
        auditable_id: deposit.id,
        story_id: story[0].id,
        created_at: deposit.get('created_at'),
        updated_at: deposit.get('created_at')
      })
    })

  },

  down: async (knex) => {
  }

}

export default MigrateDepositActivities
