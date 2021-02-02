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
      started as (
      select call_id,
      min(started_at) as started_at
      from maha_call_connections
      group by call_id
      ),
      ended as (
      select call_id,
      min(ended_at) as ended_at
      from maha_call_connections
      group by call_id
      )
      select maha_calls.id as call_id,
      ceil(extract(epoch from (ended.ended_at- started.started_at))) as duration,
      coalesce(prices.price, 0.000) as price
      from maha_calls
      inner join started on started.call_id=maha_calls.id
      inner join ended on ended.call_id=maha_calls.id
      left join prices on prices.call_id=maha_calls.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCallTotals
