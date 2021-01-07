const CreateTeamTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view maha_team_totals as
      with storage as (
      select team_id,
      sum(maha_assets.file_size) as total
      from maha_assets
      group by team_id
      ),
      users as (
      select team_id,
      count(maha_users.*) as count
      from maha_users
      group by team_id
      ),
      phone_numbers as (
      select team_id,
      count(maha_phone_numbers.*) as count
      from maha_phone_numbers
      group by team_id
      ),
      smses as (
      select team_id,
      count(maha_smses.*) as count
      from maha_smses
      group by team_id
      ),
      calls as (
      select team_id,
      count(maha_calls.*) as count
      from maha_calls
      group by team_id
      ),
      emails as (
      select team_id,
      count(maha_emails.*) as count
      from maha_emails
      group by team_id
      )
      select id as team_id,
      coalesce(storage.total, 0) as storage,
      coalesce(users.count, 0) as users_count,
      coalesce(phone_numbers.count, 0) as phone_numbers_count,
      coalesce(smses.count, 0) as smses_count,
      coalesce(calls.count, 0) as calls_count,
      coalesce(emails.count, 0) as emails_count
      from maha_teams
      left join storage on storage.team_id=maha_teams.id
      left join users on users.team_id=maha_teams.id
      left join phone_numbers on phone_numbers.team_id=maha_teams.id
      left join smses on smses.team_id=maha_teams.id
      left join calls on calls.team_id=maha_teams.id
      left join emails on emails.team_id=maha_teams.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateTeamTotals
