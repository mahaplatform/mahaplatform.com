const CreateCallTotals = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create view maha_call_totals as
      with prices as (
      select call_id,
      sum(price) as price
      from maha_call_connections
      group by call_id
      ),
      durations as (
      select call_id,
      max(duration) as duration
      from maha_call_connections
      group by call_id
      )
      select maha_calls.id as call_id,
      coalesce(durations.duration, 0) as duration,
      coalesce(prices.price, 0.000) as price
      from maha_calls
      inner join durations on durations.call_id=maha_calls.id
      inner join prices on prices.call_id=maha_calls.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCallTotals
