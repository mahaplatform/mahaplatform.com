const UpdateFormTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view crm_form_totals')
    await knex.raw(`
      create view crm_form_totals as
      with respondents as (
      select crm_forms.id as form_id,
      count(distinct crm_responses.contact_id) as total
      from crm_forms
      left join crm_responses on crm_responses.form_id=crm_forms.id
      group by crm_forms.id
      ),
      respondent_status as (
      select distinct on (responses.contact_id) responses.*
      from (
      select crm_forms.id as form_id,
      crm_responses.contact_id,
      crm_responses.is_known
      from crm_forms
      inner join crm_responses on crm_responses.form_id=crm_forms.id
      order by crm_responses.created_at asc
      ) responses
      ),
      known_respondents as (
      select respondent_status.form_id, count(respondent_status.*) as total
      from respondent_status
      where respondent_status.is_known=true
      group by respondent_status.form_id
      ),
      unknown_respondents as (
      select respondent_status.form_id, count(respondent_status.*) as total
      from respondent_status
      where respondent_status.is_known=false
      group by respondent_status.form_id
      ),
      responses as (
      select crm_forms.id as form_id,
      count(crm_responses.*) as total
      from crm_forms
      left join crm_responses on crm_responses.form_id=crm_forms.id
      group by crm_forms.id
      ),
      revenue as (
      select crm_responses.form_id,sum(crm_response_totals.revenue) as total
      from crm_responses
      inner join crm_response_totals on crm_response_totals.response_id=crm_responses.id
      group by crm_responses.form_id
      ),
      average_duration as (
      select crm_responses.form_id, avg(crm_responses.duration)::integer as average
      from crm_responses
      group by crm_responses.form_id
      ),
      first_response as (
      select crm_responses.form_id, min(crm_responses.created_at) as created_at
      from crm_forms
      inner join crm_responses on crm_responses.form_id=crm_forms.id
      group by crm_responses.form_id
      ),
      last_response as (
      select crm_responses.form_id, max(crm_responses.created_at) as created_at
      from crm_forms
      inner join crm_responses on crm_responses.form_id=crm_forms.id
      group by crm_responses.form_id
      )
      select crm_forms.id as form_id,
      coalesce(respondents.total, 0) as respondents_count,
      coalesce(known_respondents.total, 0) as known_respondents_count,
      coalesce(unknown_respondents.total, 0) as unknown_respondents_count,
      coalesce(responses.total, 0) as responses_count,
      coalesce(revenue.total, 0.00) as revenue,
      coalesce(average_duration.average, 0) as average_duration,
      first_response.created_at as first_response,
      last_response.created_at as last_response
      from crm_forms
      left join respondents on respondents.form_id=crm_forms.id
      left join known_respondents on known_respondents.form_id=crm_forms.id
      left join unknown_respondents on unknown_respondents.form_id=crm_forms.id
      left join responses on responses.form_id=crm_forms.id
      left join revenue on revenue.form_id=crm_forms.id
      left join average_duration on average_duration.form_id=crm_forms.id
      left join first_response on first_response.form_id=crm_forms.id
      left join last_response on last_response.form_id=crm_forms.id
    `)
  },

  down: async (knex) => {
  }

}

export default UpdateFormTotals
