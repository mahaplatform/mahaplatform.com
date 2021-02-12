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
      select maha_call_connections.call_id,
      min(maha_call_statuses.tstamp) as started_at
      from maha_call_statuses
      inner join maha_call_connections on maha_call_connections.id=maha_call_statuses.call_connection_id
      group by maha_call_connections.call_id
      ),
      ended as (
      select maha_call_connections.call_id,
      max(maha_call_statuses.tstamp) as ended_at
      from maha_call_statuses
      inner join maha_call_connections on maha_call_connections.id=maha_call_statuses.call_connection_id
      group by maha_call_connections.call_id
      )
      select maha_calls.id as call_id,
      started.started_at,
      ended.ended_at,
      case
      when started.started_at is not null and ended.ended_at is not null then ceil(extract(epoch from (ended.ended_at - started.started_at)))
      else 0
      end as duration,
      coalesce(prices.price, 0.000) as price
      from maha_calls
      left join started on started.call_id=maha_calls.id
      left join ended on ended.call_id=maha_calls.id
      left join prices on prices.call_id=maha_calls.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCallTotals
